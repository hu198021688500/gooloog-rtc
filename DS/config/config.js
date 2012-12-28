module.exports = {
	// 监听端口，如果配合clusterplus监听多个端口，这里也可以使用[3000, 3001, 3002,
	// 3003]数组形式，rrestjs会智能分析
	listenPort : 8083,
	// cluster配置
	// 是否开启多进程集群
	isCluster : true,
	// 开启的进程数
	ClusterNum : 1,
	// 只有当进程数为1时，进入开发模式，可以监听此文件夹下的改动，包括子文件夹，不用重复 ctrl+c 和 上键+enter
	ClusterReload : './'
};