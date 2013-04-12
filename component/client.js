/**
 * https://github.com/NetEase/pomelo.git
 * http://www.infoq.com/cn/news/2013/03/pomelo-whatsnew-0.3
 */

var ExBuffer = require("ExBuffer");

var Client = function(index, socket) {
	var exBuffer = new ExBuffer();
	exBuffer.on('data', onReceivePackData);

	socket.on('data', function(data) {
				console.log('>> server receive scoket data,length:'
						+ data.length);
				exBuffer.put(data);// 只要收到数据就往ExBuffer里面put
			});

	// 当服务端收到完整的包时
	function onReceivePackData(buffer) {
		console.log('>> server receive packet,length:' + buffer.length);
		// unpack the packet
		var bytebuf = new ByteBuffer(buffer);
		var resArr = bytebuf.uint32().string().unpack();
		console.log('>> server unpack packet:[' + resArr[0] + ',' + resArr[1]
				+ ']');

		// send a packet
		var sbuf = new ByteBuffer();
		var buf = sbuf.uint32(123).string('welcome,client:' + resArr[0])
				.pack(true);
		socket.write(buf);
	}
};