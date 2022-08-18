class Calendar {
  constructor (id){
    
    this.id = id;
    this.months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Авгус","Сентябрь","Октябрь","Ноябрь","Декабрь"]
      this.weeks = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]
      
      let now = new Date();
      this.yearNow = now.getFullYear()
      this.monthNow = now.getMonth()
      this.dateNow = now.getDate()
    }
     
     nextMoth (){
      if(this.monthNow == 11){
        this.monthNow = 0
        this.yearNow += 1
      }else{
        this.monthNow += 1
        
     }
     this.tableCreate();
    };
    
    previousMonth ()  {
      if(this.monthNow == 0){
         this.monthNow = 11
        this.yearNow -= 1
      }else{
         this.monthNow -= 1
       }
       this.tableCreate()
     }
     
     tableCreate(){
       this.init(this.yearNow,this.monthNow)
     }
     
     
    init (y, m) {
      
     // console.log(y,m)
     let day = new Date(y,m+1,0).getDate()
      let dayWeek = new Date(y, m, 7).getDay()
      let dayNextMonth = m == 0 ? new Date(y-1, 11, 0)
      .getDate() : new Date(y, m, 0).getDate();
      
      let dayPrevMonth = new Date(y,m-1, 0).getDate()
      //console.log(day)
      
      // Месяц и год
      let table = "<table>"
      table += "<thead><tr>"
      table += "<td colspan='7' >" + this.months[m] + " " + y + "</td>"
      table += "</tr></thead>"
      
      // Дни недели
      table += "<tr>"
      for(let i = 0; i<7; i++){
        table += "<td>" + this.weeks[i] + "</td>"
      }
      table += "</tr>"
      
      // Последние дни предыдущего месяца
      table += "<tr>"
      let prevDay = dayNextMonth - dayWeek +1
      //console.log(prevDay)
      for(let i = prevDay; i<= dayNextMonth; i++){
        table += "<td>" + i + "</td>"
      }
      
      // Дни
      console.log(dayWeek)
      for(let i = 1; i <= day; i++){
        let dow = new Date(y, m, i).getDay();
       
        if ( dow == 1 ) {
          table += '<tr>';
        }
        
        let chk = new Date()
        let chkY = chk.getFullYear();
        let chkM = chk.getMonth();
        if (chkY == this.yearNow 
            && chkM == this.monthNow 
            && i == this.dateNow) 
        {
          table += '<td class="today">' + i + '</td>';
        } else {
          table += '<td class="normal">' + i + '</td>';
        }
        
        if ( dow == 0 ) {
        table += '</tr>';
        }else if(i== day){
          let t = 1
          for(let i=dow;i<7;i++){
            table += '<td class="normal">' + t + '</td>';
          t++
          }
        }
      }
      
      table += "</tr>"
      
      table += "</table>"
      document.getElementById(this.id).innerHTML = table
      let w = document.querySelectorAll('.normal')
      console.log(w);
     }
  }
 
  window.onload = function () {
  let calendar = new Calendar ("calId")
  calendar.tableCreate();
  get("btnNext").onclick = () => {calendar.nextMoth()}
  get("btnPrev").onclick =() => {calendar.previousMonth()}
  
  
}
function get(id) {
    return document.getElementById(id)
  }