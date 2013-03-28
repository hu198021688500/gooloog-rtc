/**
 * New node file
 */

var arr_heap = [ 78, 13, 6, 177, 26, 90, 288, 45, 62, 83 ];

/**
 * heapsort
 * 
 * 原理：采用 nealy complete binary tree 进行排序
 * 
 * 时间复杂度： o(n*(lg n)) , 空间复杂度： o(n)
 * 
 */
function HeapSort(arrInit) {
	this.arrInit = arrInit;
}

/** 根据 pos 获得 node，pos 从 1 开始 */
HeapSort.prototype.getNodeByPos = function(arr, pos) {
	return arr[pos - 1];
};
/** 根据 pos 设置 node，pos 从 1 开始 */
HeapSort.prototype.setNodeByPos = function(arr, pos, value) {
	return arr[pos - 1] = value;
};

/** 左 子节点的 位置，位置从 1 开始 */
HeapSort.prototype.leftPos = function(arr, pos) {
	var x = pos * 2;
	return x <= arr.length ? x : undefined;
};
/** 右 子节点的 位置 */
HeapSort.prototype.rightPos = function(arr, pos) {
	var x = pos * 2 + 1;
	return x <= arr.length ? x : undefined;
};
/** 父节点的 位置，位置从 1 开始 */
HeapSort.prototype.parent = function(pos) {
	return Math.floor(pos / 2);
};

/**
 * 单节点 max-heap 时，对 节点 和 子节点 位置执行的替换操作，并用返回值标识 if & which 位置改变了
 * 
 * @param arr
 * @param pos
 * @return 如果3个node已ok，则返回 -1，否则进行排序 并返回原来最大的位置
 */
HeapSort.prototype.maxHeapBasic = function(arr, pos) {
	var max = pos;
	var left = this.leftPos(arr, pos);
	var right = this.rightPos(arr, pos);
	if (left && this.getNodeByPos(arr, left) > this.getNodeByPos(arr, pos)) {
		max = left;
	}
	if (right && this.getNodeByPos(arr, right) > this.getNodeByPos(arr, max)) {
		max = right;
	}
	if (max == pos) {
		return -1;
	} else {
		var tmp = this.getNodeByPos(arr, pos);
		this.setNodeByPos(arr, pos, this.getNodeByPos(arr, max));
		this.setNodeByPos(arr, max, tmp);
		return max;
	}
};
/**
 * 由下而上构建 max-heap 时，对某节点执行 max-heap 操作
 * 
 * @param arr
 * @param pos
 *            节点位置，从1开始
 * @return
 */
HeapSort.prototype.maxHeap = function(arr, pos) {
	var max = pos;
	do {
		max = this.maxHeapBasic(arr, max);
	} while (max >= 1);
};
/**
 * 构建 max-heap
 * 
 * @param arr
 * @return
 */
HeapSort.prototype.buildMaxHeap = function(arr) {
	for (var pos = Math.floor(arr.length / 2); pos >= 1; pos--) {
		this.maxHeap(arr, pos);
	}
};
/**
 * 排序
 * 
 * @return
 */
HeapSort.prototype.sort = function() {
	var result = new Array();
	// a copy of input array
	var arr = this.arrInit.slice();
	for (var pos = arr.length; pos >= 2; pos--) {
		this.buildMaxHeap(arr); // 创建 max-heap，顶部是 当前剩余数组的 最大值
		result.unshift(arr.shift()); // 最大值写入 结果数组，并从原数组删除
	}
	result.unshift(arr.shift()); // 最后1个元素
	return result;
};