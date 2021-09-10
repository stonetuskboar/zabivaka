


 export class status {
    constructor(monster) {
        this.monster = monster;
        this.statusData= {
            [this.TYPES[1]]: 0,
            [this.TYPES[2]]: 7,
            [this.TYPES[3]]: 3,
            [this.TYPES[4]]: 2,
            [this.TYPES[5]]: 3,
            [this.TYPES[6]]: 0,
            [this.TYPES.LIF]: 1,
            [this.TYPES.ADD]: [],
            [this.TYPES.EVT]: [],
        };
    }

     TYPES = {
        1: "DAY", //  日期 DAY
        2: "CHA", // 魅力 charm  CHA
        3: "INT", // 智力 intelligence INT
        4: "STR", // 战力 stength STR
        5: "CON", // 体质 Constitution CON
        6: "LUST", // 淫乱 LUST LUST
        LIF: "LIF", // 生命 life LIFE
        ADD: "ADD", // 状态 Addition Status ADD

        TLT: "TLT", // 天赋 talent TLT
        EVT: "EVT", // 事件 Event EVT
        TMS: "TMS", // 次数 times TMS
    };
    monster;
    statusData;

    Progress(document){
        this.statusData.DAY ++;
        var Event;
        if(this.statusData[this.TYPES.EVT] == 0)
        {
            console.log("随机选");
        Event = this.EventRandom();
        }
        else{
            Event = this.monster[this.statusData[this.TYPES.EVT].pop()-1];
        }

        var describe ="";
        if(this.EventQualified(Event) ==true)
        {   
            describe = Event.Event+Event.goodPrompt;
            console.log(describe);
            console.log("成功")
            if(this.numIsEmpty(Event.goodBranch) == false)
            {
                this.statusData[this.TYPES.EVT].push(Event.goodBranch);//成功分支
            }
        }
        else//失败分支
        {
            console.log("失败")
            describe = Event.Event+Event.badPrompt;
            if(this.numIsEmpty(Event.badBranch) == false)
            {
                this.statusData[this.TYPES.EVT].push(Event.badBranch);
            }
        }
        this.statusChange(Event);

        var li ="<li><span>"+this.statusData.DAY+"日：</span><span>"+describe+"</span></li>";
        var adventure =document.getElementById('adventure');
        adventure.innerHTML =adventure.innerHTML+li;

        for(var i =2;i<=6;i++)
        {
            document.getElementById(this.TYPES[i]).innerHTML = this.statusData[this.TYPES[i]];
        }
        if(this.statusData["ADD"].length >0){
        document.getElementById("ADD").innerHTML =this.statusData["ADD"].join();}
        else{
            document.getElementById("ADD").innerHTML ="无";
        }

        adventure.scrollTop =adventure.scrollHeight;

    }

    statusChange(Event)//改变状态
    {
        var qualified = true;
        for(var i =2;i<=6;i++)
        {
            this.statusData[this.TYPES[i]] += Event[this.TYPES[i] +"change"];
        }
        Event["Addchange"].forEach(addchange=>{
            if(this.isEmpty(addchange) == false)
            {
                if(addchange.startsWith("-"))
                {
                    console.log(this.statusData[this.TYPES.ADD]);
                    console.log(addchange);
                    var replaced =addchange.replace("-","");
                    var n =this.statusData[this.TYPES.ADD].indexOf(replaced);
                    if(n != -1){
                        this.statusData[this.TYPES.ADD].splice(n,1);}
                }
                else if(this.statusData[this.TYPES.ADD].includes(addchange) == false)//不要重复添加
                {
                    this.statusData[this.TYPES.ADD].push(addchange);
                }
            }
        })


    }


    EventQualified(Event){//单个事件
        var qualified = true;
        for(var i =2;i<=6;i++)
        {
            qualified = this.attributeRandom(this.statusData[this.TYPES[i]],Event[this.TYPES[i]]);
            if(qualified == false)
            {
                return false;
            }
        }
        return true;
    }
    
    attributeRandom(state, require){//自身点数大于事件需求
        if(this.numIsEmpty(require) == true)//无需求
        {
            return true;
        }
        var randRequire =Math.random()*require*2 -require;
        if(state >= randRequire)
        {
            return true;
        }
        else{
            return false;
        }
    }


    EventRandom(){

        var Events = this.monster.filter(this.checkValid,this);
        var randnum = (Math.floor(Math.random()*Events.length));
        console.log(Events);
        console.log(Events[randnum].Event);
        return Events[randnum];
    }
    
    checkValid(monster){

        if(this.isEmpty(monster.Add) == true)//事件条件都为空则可以
        {
            if(this.isEmpty(monster.include) == true)
            {       
                if(this.statusData.ADD.length == 0)
                {
                 return true;
                }
            }

        }
        else{
            var state = true;
            monster.Add.forEach(element => {

                if(element.startsWith("-") == true) //负号代表该条件不能出现
                {
                    var replaced =element.replace("-","");
                    if(this.statusData.ADD.includes(replaced) == true)
                    {
                        state = false;
                    }
                }
                else if(this.statusData.ADD.includes(element) == false)
                {
                    state = false;
                }
            })
            return state;//True or false
        }
        
    }

    isEmpty(string){
        if(string === undefined || string.length == 0 || string ==null )
        {
            return true;
        }
        else{
            return false;
        }

    }
    numIsEmpty(num){
        if(num =="" || num == null || num === undefined || num == 0)//无需求
        {
            return true;
        }
        else{
            return false;
        }
    }
}



export const abcd =123;

