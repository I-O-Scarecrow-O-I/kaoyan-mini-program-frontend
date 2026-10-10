export const questions = [
	{
		question: '操作系统的作用是什么？',
		options: ['管理计算机硬件', '提供用户界面', '执行应用程序', '所有以上都是'],
		correctAnswerIndex: 3,
		explanation: '操作系统的作用包括管理计算机硬件资源、提供用户界面以及执行应用程序等多个方面。',
		isFavorited: false,
		isErrored: false
	},
	{
		question: '进程和线程的区别是什么？',
		options: ['进程具有独立的地址空间，线程共享地址空间', '进程执行速度更快', '进程只能包含一个线程', '线程可以独立运行'],
		correctAnswerIndex: 0,
		explanation: '进程是程序的执行实例，拥有独立的地址空间，而线程是进程内的执行单元，共享相同的地址空间。',
		isFavorited: false,
		isErrored: false
	},
	{
		question: '虚拟内存的作用是什么？',
		options: ['提供更大的物理内存', '保护内存中的数据', '允许程序使用超出物理内存的地址空间', '提高内存访问速度'],
		correctAnswerIndex: 2,
		explanation: '虚拟内存允许程序使用超出物理内存容量的地址空间，将部分数据存储在硬盘上，从而扩展了可用的内存大小。',
		isFavorited: false,
		isErrored: false
	}
];
