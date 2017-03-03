// 1. 完成页面结构、布局、样式
// 2. 设计数据结构
// 3. 完成数据绑定
// 4. 设计交互操作事件
// 5. 数据存储
Page({
  // ===== 页面数据对象 =====
  data: {
   
    input: '',
    srcData:[],
    result: [],
    itemCount: 0,
    allCompleted: false,
    history: [],
    board:[],
    channel:{},
    channelKey:'All',
    indexB:0,
    indexC:0
  },
  save: function () {
    wx.setStorageSync('search_result', this.data.result);
    wx.setStorageSync('search_hisory', this.data.history)
  },
  load: function () {

    var srcData = wx.request({
      url:'https://www.bjccyanji.top',
      success:(res)=>{
        var srcData = res.data.slice(0);
        srcData.forEach((item)=>{
          var name = item.name.toUpperCase();
          Object.assign(item,{name:name});
        });
        var board = ['All'],
            channel = {}
        res.data.forEach((item)=>{
          var bJusetify = board.some(bItem=>item.board==bItem);
          if(!bJusetify){
              board.push(item.board);
          }
        });
        board.forEach((item)=>{
          channel[item] = (srcData.filter((cItem)=>cItem.board == item)).map((dItem)=>dItem.channel);
          channel[item].unshift('All');
        })
        this.setData({srcData:srcData,board:board,channel:channel})
      }
    });
    

    var result = wx.getStorageSync('search_result');
    if (result) {
      var itemCount = result.length
      this.setData({ result: result, itemCount: itemCount })
    }
    var history = wx.getStorageSync('search_hisory')
    if (history) {
      this.setData({ history: history })
    }
  },
  // ===== 页面生命周期方法 =====
  onLoad: function () {
    this.load()
  },
  // ===== 事件处理函数 =====
  bPickerChange: function(e) {
    var data = this.data.srcData;
    var result= [];
    var board = this.data.board[e.detail.value];
    if(board=='All'){
      result= [];
    }else{
      result= data.filter(item=>item.board==board);
    }
    var history = this.data.history
    result.forEach((item)=>{
      var newItem = Object.assign({timestamp:new Date().toLocaleTimeString()},item)
      history.push(newItem);
    });
   var itemCount = result.length;
    this.setData({
      input: '',
      result: result,
      itemCount: itemCount,
      history: history,
      indexB: e.detail.value,
      channelKey: this.data.board[e.detail.value]
    })
    this.save();
  },
  cPickerChange: function(e) {
     var data = this.data.srcData;
    var result= [];
    var channelList = this.data.channel[this.data.board[this.data.indexB]];
    var channel = channelList[e.detail.value];
    if(channel=='All'){
      result = data.filter(item=>true);
    }else{
      result = data.filter(item=>item.channel==channel&&item.board==this.data.board[this.data.indexB]);
    }
    
    var history = this.data.history
    result.forEach((item)=>{
      var newItem = Object.assign({timestamp:new Date().toLocaleTimeString()},item)
      history.push(newItem);
    });
   var itemCount = result.length;
   
    this.setData({
      input: '',
      result: result,
      itemCount: itemCount,
      history: history,
      indexC: e.detail.value
    })
    this.save();
  },
  inputChangeHandle: function (e) {
    if(e.detail.value){
      var input = e.detail.value;
      input = input.toUpperCase();
    }
    this.setData({ input: input })
  },
  searchItem: function (e) {
    if (!this.data.input || !this.data.input.trim()) return;
	 var data = this.data.srcData;
    var result= [];
    var input = this.data.input;
    result = data.filter((item)=>{
      var justify ;
    	justify = item.key==this.data.input||item.name.indexOf(this.data.input)!=-1;
      return justify;
    })
   	var history = this.data.history
   	result.forEach((item)=>{
   		var newItem = Object.assign({timestamp:new Date().toLocaleTimeString()},item)
		history.push(newItem);
   	});
   var itemCount = result.length;
    this.setData({
      input: '',
      result: result,
      itemCount: itemCount,
      history: history
    })
    this.save()
  },

  // toggleTodoHandle: function (e) {
  //   var index = e.currentTarget.dataset.index
  //   var todos = this.data.todos
  //   todos[index].completed = !todos[index].completed
  //   var logs = this.data.logs
  //   logs.push({
  //     timestamp: new Date(),
  //     action: todos[index].completed ? '标记完成' : '标记未完成',
  //     name: todos[index].name
  //   })
  //   this.setData({
  //     todos: todos,
  //     leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
  //     logs: logs
  //   })
  //   this.save()
  // },
  // removeTodoHandle: function (e) {
  //   var index = e.currentTarget.dataset.index
  //   var todos = this.data.todos
  //   var remove = todos.splice(index, 1)[0]
  //   var logs = this.data.logs
  //   logs.push({ timestamp: new Date(), action: '移除', name: remove.name })
  //   this.setData({
  //     todos: todos,
  //     leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
  //     logs: logs
  //   })
  //   this.save()
  // },
  // toggleAllHandle: function (e) {
  //   this.data.allCompleted = !this.data.allCompleted
  //   var todos = this.data.todos
  //   for (var i = todos.length - 1; i >= 0; i--) {
  //     todos[i].completed = this.data.allCompleted
  //   }
  //   var logs = this.data.logs
  //   logs.push({
  //     timestamp: new Date(),
  //     action: this.data.allCompleted ? '标记完成' : '标记未完成',
  //     name: '全部任务'
  //   })
  //   this.setData({
  //     todos: todos,
  //     leftCount: this.data.allCompleted ? 0 : todos.length,
  //     logs: logs
  //   })
  //   this.save()
  // },
  clearCompletedHandle: function () {
    this.setData({ result: []})
    this.save()
  }
})
