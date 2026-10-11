export const questions = [
	{
		id: 1,
		question: '数组和链表的主要区别是什么？',
		options: ['数组在内存中是连续存储的，而链表不是', '数组具有动态大小，链表大小固定', '数组只能存储基本数据类型，链表可以存储任意类型数据', '数组访问速度比链表快'],
		correctAnswerIndex: 0,
		explanation: '数组在内存中是连续存储的，而链表不是，这意味着在数组中查找元素的速度比链表快。',
		isFavorited: false,
		isErrored: false,
		discussions: [], // 讨论区内容数组  
		myDiscussions: [] // 新讨论的输入框内容  
	},
	{
		question: '栈和队列有什么区别？',
		options: ['栈是后进先出（LIFO）的数据结构，队列是先进先出（FIFO）的数据结构', '栈是先进先出（FIFO）的数据结构，队列是后进先出（LIFO）的数据结构', '栈和队列的操作方式完全相同', '栈和队列在实现上是相同的'],
		correctAnswerIndex: 0,
		explanation: '栈是后进先出（LIFO）的数据结构，而队列是先进先出（FIFO）的数据结构。',
		isFavorited: false,
		isErrored: false,
		discussions: [],
		myDiscussions: []
	},
	{
		question: '二叉树中的节点最多有多少个子节点？',
		options: ['2', '3', '4', '无限多'],
		correctAnswerIndex: 0,
		explanation: '二叉树中的节点最多有两个子节点，即左子节点和右子节点。',
		isFavorited: false,
		isErrored: false,
		discussions: [],
		myDiscussions: []
	}
];
