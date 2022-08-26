class Calendar {
  constructor(id) {
    this.id = id;
    this.months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    this.weeks = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    let now = new Date();
    this.yearNow = now.getFullYear();
    this.monthNow = now.getMonth();
    this.dateNow = now.getDate();

    this.workDays;
    this.dayOff;
    this.workNight;
    this.dayOffd;
    this.beginning;

    this.ai = 0;
    this.bi = 0;
    this.ci = 0;
    this.di = 0;

    this.onWorkDay = false;
  }

  nextMoth() {
    if (this.monthNow == 11) {
      this.monthNow = 0;
      this.yearNow += 1;
    } else {
      this.monthNow += 1;
    }
    if (this.onWorkDay == true) {
      this.tableCreate();
      this.dayChart();
    } else {
      this.tableCreate();
    }
  }

  previousMonth() {
    if (this.monthNow == 0) {
      this.monthNow = 11;
      this.yearNow -= 1;
    } else {
      this.monthNow -= 1;
    }
    if (this.onWorkDay == true) {
      this.tableCreate();
      this.dayChartLast();
    } else {
      this.tableCreate();
    }
  }

  dayChartFirst() {
    this.ai = 0;
    this.bi = 0;
    this.ci = 0;
    this.di = 0;
    this.dayChart();
  }

  dayChart() {
    this.dayCharts(
      this.yearNow,
      this.monthNow,
      (this.workDays = get("selectWorkDays").value),
      (this.dayOff = get("selectDayOff").value),
      (this.workNight = get("selectWorkNight").value),
      (this.dayOffd = get("selectDayOffd").value),
      (this.beginning = get("selectDay").value)
    );
  }

  dayChartLast() {
    this.dayChartsLast(
      (this.workDays = get("selectWorkDays").value),
      (this.dayOff = get("selectDayOff").value),
      (this.workNight = get("selectWorkNight").value),
      (this.dayOffd = get("selectDayOffd").value)
    );
  }
  //Следующий
  dayCharts(y, m, a, b, c, d, u) {

    //Следующий рассчитывает график на следующий месяц
    let day = new Date(y, m + 1, 0).getDate();
    let w = document.querySelectorAll(".normal");
    let o = Number(u - 1);

    for (let i = 0; i < w.length; i++) {
      w[i].className = "normal";
    }

    this.onWorkDay = true;
    const charts = {
      0: "workDay",
      1: "dayOff",
      2: "workNigth",
      3: "dayOff",
    };

    do {
      [a - this.ai, b - this.bi, c - this.ci, d - this.di].forEach(
        (item, index) => {
          for (let i = 0; i < item; i++) {
            if (o >= day) break;

            w[o].classList.add(charts[index]);

            o += 1;

            if (index == 0) {
              this.ai += 1;
            }
            if (index == 1) {
              this.bi += 1;
            }
            if (index == 2) {
              this.ci += 1;
            }
            if (index == 3) {
              this.di += 1;
            }

            if (this.ai == a && this.bi == b && this.ci == c && this.di == d) {
              this.ai = 0;
              this.bi = 0;
              this.ci = 0;
              this.di = 0;
            }
          }
        }
      );
    } while (o < day);
  }

  //Предыдущий
  dayChartsLast(a, b, c, d) {

    //Рассчитывает график на предыдущий месяц
    let w = document.querySelectorAll(".normal");
    let o = w.length - 1;

    for (let i = 0; i < w.length; i++) {
      w[i].className = "normal";
    }

    this.onWorkDay = true;
    const charts = {
      3: "workDay",
      2: "dayOff",
      1: "workNigth",
      0: "dayOff",
    };

    do {
      [a, b, c, d].forEach((item, index) => {
        for (let i = 0; i < item; i++) {
          // if (o == 1) break;

          w[o].classList.add(charts[index], "normal");

          o -= 1;

          // if(index == 0){
          //   this.ai-=1
          //  }
          // if(index == 1){
          //   this.bi-=1
          // }
          // if(index == 2){
          //   this.ci-=1
          // }
          // if(index == 3){
          //   this.di-=1
          // }
          //console.log(this.ai,this.bi,this.ci,this.di)
          if (this.ai == 0 && this.bi == 0 && this.ci == 0 && this.di == 0) {
            this.ai = a;
            this.bi = b;
            this.ci = c;
            this.di = d;
          }
        }
      });
    } while (o == 1);
  }

  // Данные в таблицу
  tableCreate() {
    this.init(this.yearNow, this.monthNow);
  }

  //Количество дней между датами
  getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }

  //Построение таблицы
  init(y, m) {
    let day = new Date(y, m + 1, 0).getDate();
    let dayWeek = new Date(y, m, 7).getDay();
    let dayNextMonth =
      m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    // Месяц и год
    let table = "<table>";
    table += "<thead><tr>";
    table += "<td colspan='7' >" + this.months[m] + " " + y + "</td>";
    table += "</tr></thead>";

    // Дни недели
    table += "<tr class='weeks'>";
    for (let i = 0; i < 7; i++) {
      table += "<td>" + this.weeks[i] + "</td>";
    }
    table += "</tr>";

    // Последние дни предыдущего месяца
    table += "<tr>";
    let prevDay = dayNextMonth - dayWeek + 1;
    for (let i = prevDay; i <= dayNextMonth; i++) {
      table += '<td class="lastManth">' + i + "</td>";
    }

    // Дни
    for (let i = 1; i <= day; i++) {
      let dow = new Date(y, m, i).getDay();

      if (dow == 1) {
        table += "<tr>";
      }

      let chk = new Date();
      let chkY = chk.getFullYear();
      let chkM = chk.getMonth();
      if (chkY == this.yearNow && chkM == this.monthNow && i == this.dateNow) {
        table += '<td class="today normal">' + i + "</td>";
      } else {
        table += '<td class="normal">' + i + "</td>";
      }

      // Первые дни следующего месяца
      if (dow == 0) {
        table += "</tr>";
      } else if (i == day) {
        let t = 1;
        for (let i = dow; i < 7; i++) {
          table += '<td class="lastManth">' + t + "</td>";
          t++;
        }
      }
    }

    table += "</tr>";
    table += "</table>";

    let select = "";
    for (let i = 1; i <= day; i++) {
      select += `<option value=${i}>${i}</option>`;
    }

    document.getElementById(this.id).innerHTML = table;
    document.getElementById("selectDay").innerHTML = select;
    let w = document.querySelectorAll(".normal");

    for (let i = 1; i < w.length; i++) {
      w.id = i;
    }

    //Расчет рабочий или выходной день
    const dateInput = document
      .getElementById("dateInput")
      .addEventListener("change", () => {
        let myDate = new Date(document.getElementById("dateInput").value);
        let chk = new Date();
        let chD = chk.getDate();
        this.workDays = get("selectWorkDays").value;
        this.dayOff = get("selectDayOff").value;
        this.workNight = get("selectWorkNight").value;
        this.dayOffd = get("selectDayOffd").value;
        this.beginning = get("selectDay").value;

        //Количество дней между датами
        let getDay = this.getNumberOfDays(chk, myDate);

        let week = [
          "Воскресенье",
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
        ][myDate.getDay()];

        const charts = {
          0: " Рабочий день",
          1: " Выходной день",
          2: " Рабочая ночная смена",
          3: " Выходной день",
        };

        //Колличество дней от начала смен
        let sumDay = chD - this.beginning + getDay + 1;
        let o = 0;
        do {
          [this.workDays, this.dayOff, this.workNight, this.dayOffd].forEach(
            (item, index) => {
              for (let i = 0; i < item; i++) {
                console.log(charts[index]);
                o += 1;
                if (o == sumDay) {
                  console.log(charts[index]);
                  week += ` ${i + 1} ${charts[index]}`;
                }
              }
            }
          );
        } while (o < sumDay);

        document.getElementById("result").textContent = week;
      });
  }
}

window.onload = function () {
  let calendar = new Calendar("calId");
  calendar.tableCreate();
  get("btnNext").onclick = () => {
    calendar.nextMoth();
  };
  get("btnPrev").onclick = () => {
    calendar.previousMonth();
  };
  get("btnWork").onclick = () => {
    calendar.dayChartFirst();
  };
};
function get(id) {
  return document.getElementById(id);
}
