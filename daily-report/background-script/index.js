console.log('background script loaded!')


//数据区
var  data={
        daily:{
            currentIndex:-1,
            tasks:[
            ]
        }
    };
//方法区

function getNextNotification(cb){
    console.log('getNextNotification')
    ajaxHelper.get("notifications?tags=app%3A5937b10b83963200444b1ff8%2Ctime%3Anow%2CmentionMeEver&limit=20",{
        offset:0
    }).then((data)=>{
        console.log('获取的通知数据2：')
        console.log(data);
        cb && cb(data);
    });
}
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    getNextNotification((data)=>{
        console.log('准备回复3:');
        console.log(data);
        sendResponse(data);
        // sendResponse(JSON.stringify(data));
    })
    return true; //sendResponse是同步调用的，如果你希望异步调用sendResponse,需要在onMessage事件处理器中加上return true
});