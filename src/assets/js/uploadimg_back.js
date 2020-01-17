//上传成功回调函数
function uploaded(ret, file) {

    timer_img_ajax =setInterval(function () {
        var res = validateImage(ret.site_url)
        if (res){
            var msgImg = '<div class="roomAdminImg"><img src="' + ret.site_url + '" alt=""  /></div>';
            var message = '{"class":"frontend","method":"say","content":"' + htmlspecialchars(msgImg) + '"}';
            ws.send(message);
            clearInterval(timer_img_ajax)
        }else{
            console.log(res)
        }
    },100)

}

function validateImage(url)
{
    var xmlHttp ;
    if (window.ActiveXObject)
    {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest)
    {
        xmlHttp = new XMLHttpRequest();
    }
    xmlHttp.open("Get",url,false);
    xmlHttp.send();
    if(xmlHttp.status==404)
        return false;
    else
        return true;
}
//上传成功回调函数
$(function () {
    function UploaderFn() {
        WebUploader.Uploader.register({'before-send-file': 'preupload'}, {
            preupload: function (file) {
                var me = this, owner = this.owner, deferred = WebUploader.Deferred();
                owner.md5File(file.source).fail(function () {
                    deferred.reject();
                    console.log('失败');
                }).then(function (md5) {
                    file.md5 = md5;
                    var data = {id: file.id, md5: md5, uptype: 'oss', filename: file.name};
                    $.ajax(upload_state, {
                        dataType: 'json', method: 'post', data: data, success: function (ret) {
                            console.log(ret)
                            if (ret.code !== 'NOT_FOUND') {
                                owner.skipFile(file);
                            } else {
                                file.md5 = md5;
                                file.token = ret.data.token || '';
                                file.key = ret.data.file_url || '';
                                file.site_url = ret.data.site_url || '';

                                //添加oss上传
                                me.options.formData.OSSAccessKeyId = ret.data.OSSAccessKeyId || ''; // OSS
                                me.options.formData.signature = ret.data.signature; // OSS
                                me.options.formData.policy = ret.data.policy; // OSS
                                me.options.formData.success_action_status = '200'; // OSS
                                me.options.server = ret.data.server;
                                console.log('上传');
                            }
                            uploaded.call(uploader, ret.data, file);
                            deferred.resolve();
                        }
                    });
                });
                return deferred.promise();
            }
        });
    }
    UploaderFn();
    initWebuploader();
    function initWebuploader() {
        var uploader = WebUploader.create({
            pick: {
                id: '#filePicker',
                label: '选择文件',
                multiple: false
            },
            accept: {title: '选择文件', extensions: 'jpg,png', mimeTypes: '{php}echo service\FileService::getFileMine("jpg,png");{/php}'},
            formData: {},
            auto: true,
            duplicate: true,
            fileNumLimit: 1,
            threads: 1,
            server: upload_url,
            swf: '__STATIC__/plugs/uploader/Uploader.swf',
            chunked: false,
            dnd: '#dndArea',
            paste: document.body,
            chunkSize: 512 * 1024,
            disableGlobalDnd: true,
            fileSizeLimit: 200 * 1024 * 1024, // 200 M
            fileSingleSizeLimit: 200 * 1024 * 1024, // 200 M
            compress: {
                width: 1600,
                height: 16000,
                crop: false, // 是否允许裁剪
                quality: 90, // 图片质量(只有type为`image/jpeg`的时候才有效)
                allowMagnify: false, // 是否允许放大(如果想要生成小图的时候不失真，此选项应该设置为false).
                preserveHeaders: true, // 是否保留头部meta信息
                noCompressIfLarger: false, // 如果发现压缩后文件大小比原来还大，则使用原来图片
                compressSize: 1024 * 512 // 单位字节(如果图片大小小于此值，不会采用压缩)
            }
        });

        /* 上传开始前的处理 */
        uploader.on('uploadBeforeSend', function (file, data, header) {
            header['X_Requested_With'] = 'XMLHttpRequest';
            data['allowed_types'] = this.options.accept[0].extensions.split(',').join('|');
            data['token'] = file.file.token;
            data['md5'] = file.file.md5;
            data['key'] = file.file.key;
            console.log('uploadBeforeSend')
        });

        /* 处理上传后的结果 */
        uploader.on('uploadAccept', function (fieldata, ret) {
            if (ret.code === 'SUCCESS') {
                uploaded.call(uploader, ret.data, fieldata.file);
                return true;
            }
        });
        uploader.on("uploadFinished", function () {
            uploader.destroy();
            initWebuploader();
        });
    }
});