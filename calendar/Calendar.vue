<template>
  <div class="month-calendar-container">
    <div class="month-calendar-headers">
      <div class="month-calendar-headers-left">
        <Button style="color:#18191a;" type="text" @click="year -= 1">＜＜</Button>
        <Button style="color:#18191a;" type="text" @click="monthMinus">＜</Button>
      </div>
      <div class="month-calendar-headers-text">
        {{headerText}}
      </div>
      <div class="month-calendar-headers-right">
        <Button style="color:#18191a;" type="text" @click="year += 1">＞＞</Button>
        <Button style="color:#18191a;" type="text" @click="monthPlus">＞</Button>
      </div>
    </div>
    <div class="month-calendar-body">
      <ul class="month-calendar-body-week">
        <li class="first">日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
      <ul class="month-calendar-body-date">
        <li v-for="(day,index) in allDays" :key="index" :class="getDayClass(day)" @click="checkDateHandler(day)" @mouseenter="enterDateHandler(day)">
          {{day.date}}
          <i class="leave-sign" v-if="day.selected && day.date">
            请假
          </i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: { type: Array, default: () => [] },
    option: { type: Object, default: () => ({})},
    open: { type: Boolean, default: false },
    type: { type: String, default: 'single' } // single  range
  },
  data () {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      allDays: [],
      rangeStart: '',
      rangeEnd: ''
    }
  },
  methods: {
    leaveShow () {
      this.$emit('navShow', false)
      this.allDays.forEach((items, index) => {
        items['selected'] = false
      })
    },
    getAllDays (year, month) {
      /*
         *判断当月1号星期几，通过遍历获取非本月前面空余天数
         *monthAllDays (当月总天数)
         */
      let array = []
      let weekStart = new Date(year, month, 1).getDay()
      while (weekStart) {
        const tmpDate = new Date(
          new Date(year, month, 1).valueOf() - weekStart * 24 * 60 * 60 * 1000
        )
        array.push({
          fullDate: `${tmpDate.getFullYear()}-${
            tmpDate.getMonth() + 1 < 10
              ? 0 + String(tmpDate.getMonth() + 1)
              : tmpDate.getMonth() + 1
          }-${
            tmpDate.getDate() < 10
              ? 0 + String(tmpDate.getDate())
              : tmpDate.getDate()
          }`,
          date: '',
          selected: false,
          disabled: false
        })
        weekStart -= 1
      }
      const monthAllDays =
        month < 11
          ? new Date(
            new Date(year, month + 1, 1).valueOf() - 24 * 60 * 60 * 1000
          ).getDate()
          : 31
      for (let i = 0; i < monthAllDays; i += 1) {
        let tmpDay = {
          fullDate: `${year}-${
            month + 1 < 10 ? 0 + String(month + 1) : month + 1
          }-${i + 1 < 10 ? 0 + String(i + 1) : i + 1}`,
          date: i + 1,
          selected: false,
          disabled: false
        }
        array.push(tmpDay)
      }
      return array
    },
    filterOptionData (data, list) {
      /**
       * 过滤数据，遍历选中
       * @param {data} 全月数据
       * @param {list} 选中数据
       */
      let len = list.length
      data.forEach(item => {
        item['selected'] = false
        for (let i = 0; i < len; i++) {
          if (item['fullDate'] === list[i] && item['date']) {
            item['selected'] = true
          }
        }
        if (!this.option.disabledOption) return
        if (this.option.disabledOption(item['fullDate'])) {
          item['disabled'] = true
        }
      })
    },
    checkDateHandler (day) {
      this.$emit('navShow', true)
      /**
       * 点选日期
       */
      if (!day.date || day.disabled) return // 排除不现实日期与禁止选择日期
      if (this.type === 'single') {
        // 单选项
        day['selected'] = !day['selected']
        let index = this.selectList.findIndex((item, i) => {
          return day['fullDate'] === item
        })
        day['selected']
          ? this.selectList.push(day['fullDate'])
          : this.selectList.splice(index, 1)
        this.$emit('input', this.selectList)
      } else {
        // 连选项
        let cur = day['fullDate']
        if (this.rangeEnd) {
          this.rangeStart = cur
          this.rangeEnd = ''
          this.filterOptionData(this.allDays, [cur])
          this.$emit('input', [cur])
        } else {
          if (this.rangeStart) {
            if (
              new Date(this.rangeStart).valueOf() <= new Date(cur).valueOf()
            ) {
              this.rangeEnd = cur
            } else {
              let change = this.rangeStart
              this.rangeEnd = change
              this.rangeStart = cur
            }
            let start = new Date(this.rangeStart).valueOf()
            let end = new Date(this.rangeEnd).valueOf()
            let list = this.filterRangeDate(start, end)
            this.filterOptionData(this.allDays, list)
            this.$emit('input', [this.rangeStart, this.rangeEnd])
          } else {
            this.rangeStart = cur
            this.filterOptionData(this.allDays, [new Date(cur).valueOf()])
            this.$emit('input', [cur])
          }
        }
      }
    },
    filterRangeDate (start, end) {
      /**
       * 连选数据整合
       */
      return this.allDays
        .filter(item => {
          let time = new Date(item['fullDate']).valueOf()
          return time >= start && time <= end
        })
        .map(el => {
          return el['fullDate']
        })
    },
    enterDateHandler (day) {
      /**
       * 滑动连选过程控制
       */
      if (
        this.type === 'single' ||
        this.rangeEnd ||
        !day['date'] ||
        day['disabled']
      ) { return }
      let hoverDay = day['fullDate']
      if (this.rangeStart) {
        let cur = new Date(hoverDay).valueOf()
        let start = new Date(this.rangeStart).valueOf()
        let list = this.filterRangeDate(...[start, cur].sort())
        this.filterOptionData(this.allDays, list)
      }
    },
    renderCalendar () {
      this.allDays = this.getAllDays(this.year, this.month)
      this.filterOptionData(this.allDays, this.selectList)
    },
    getDayClass (day) {
      /*
          day-list-nomal: 正常list
          day-list-select: 选中
          day-list-disabled: 禁选
         */
      let clazz = ['day-list-nomal']
      if (day['selected']) clazz = ['day-list-select']
      if (day['disabled']) clazz = ['day-list-disabled']
      return clazz
    },
    monthMinus () {
      if (this.month === 0) {
        this.year -= 1
        this.month = 11
      } else {
        this.month -= 1
      }
    },
    monthPlus () {
      if (this.month === 11) {
        this.year += 1
        this.month = 0
      } else {
        this.month += 1
      }
    }
  },
  computed: {
    headerText () {
      return this.year + '年' + (this.month + 1) + '月'
    },
    selectList () {
      // 双向绑定数据
      if (this.type === 'single') {
        return this.value
      } else {
        if (this.value.length <= 1) {
          return this.value
        } else {
          let start = new Date(this.value[0]).valueOf()
          let end = new Date(this.value[this.value.length - 1]).valueOf()
          let list = this.filterRangeDate(...[start, end].sort())
          return list
        }
      }
    }
  },
  watch: {
    year () {
      this.renderCalendar()
    },
    month () {
      this.renderCalendar()
    },
    open (val) {
      if (val) {
        this.year = new Date().getFullYear()
        this.month = new Date().getMonth()
        if (this.type === 'single') {
          this.$emit('input', this.selectList)
        } else {
          let len = this.selectList.length
          if (len <= 1) {
            this.$emit('input', this.selectList)
          } else {
            this.$emit('input', [this.selectList[0], this.selectList[len - 1]])
          }
        }
      }
    },
    value () {
      this.filterOptionData(this.allDays, this.selectList)
    }
  },
  mounted () {
    this.renderCalendar()
  }
}
</script>
<style lang="less" rel="stylesheet/less">
.month-calendar-container {
  .month-calendar-navTab {
    border-bottom: 1px solid #d9d9d9;
    p {
      width: 100px;
      margin: 10px 0;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      img {
        width: 10px;
        height: 10px;
        color: #000;
        cursor: pointer;
      }
    }
  }
  .month-calendar-headers {
    height: 45px;
    & > div {
      float: left;
      color: #18191a;
      height: 45px;
      line-height: 45px;
    }
    .month-calendar-headers-left {
      width: 25%;
      button {
        margin-left: 0;
      }
    }
    .month-calendar-headers-text {
      width: 50%;
      text-align: center;
    }
    .month-calendar-headers-right {
      width: 25%;
      button {
        float: right;
        margin-left: 0;
        margin-top: 6px;
      }
    }
  }
  .month-calendar-body {
    .month-calendar-body-week {
      height: 35px;
      background: #d9d9d9;
      & > li {
        float: left;
        color: #18191a;
        width: 14.28%;
        text-align: center;
        height: 35px;
        line-height: 35px;
      }
      & > li:not(.first) {
        border-left: 1px solid #fff;
      }
    }
    .month-calendar-body-date {
      overflow: hidden;
      & > li {
        float: left;
        color: #18191a;
        width: 14.28%;
        text-align: center;
        height: 50px;
        line-height: 35px;
        position: relative;
        .leave-sign {
          font-style: normal;
          font-size: 12px;
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          bottom: 0;
        }
      }
      .day-list-nomal {
        background: #fff;
        color: #18191a;
        cursor: pointer;
        &:hover {
          background: #e1f0fe;
        }
      }
      .day-list-select {
        background: #377dff;
        color: #fff;
        cursor: pointer;
      }
      .day-list-disabled {
        background: #fff;
        color: gray;
        cursor: not-allowed;
      }
    }
  }
}
</style>
