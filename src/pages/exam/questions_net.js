export const questions = [
	{
		question: 'TCP和UDP之间的主要区别是什么？',
		options: ['TCP提供可靠的数据传输，而UDP不保证可靠性', 'TCP速度更快', 'UDP连接较为稳定', 'TCP不需要进行错误检测'],
		correctAnswerIndex: 0,
		explanation: 'TCP（传输控制协议）提供可靠的数据传输，保证数据的顺序和完整性，而UDP（用户数据报协议）不保证可靠性。',
		isFavorited: false,
		isErrored: false
	},
	{
		question: 'IP地址用于什么目的？',
		options: ['唯一标识网络中的设备', '提供电源给设备', '加密数据传输', '控制网络流量'],
		correctAnswerIndex: 0,
		explanation: 'IP地址用于唯一标识网络中的设备，使它们可以相互通信。',
		isFavorited: false,
		isErrored: false
	},
	{
		question: 'HTTP协议的默认端口号是多少？',
		options: ['80', '443', '8080', '21'],
		correctAnswerIndex: 0,
		explanation: 'HTTP协议的默认端口号是80，用于传输超文本传输协议（HTTP）的数据。',
		isFavorited: false,
		isErrored: false
	}
];
