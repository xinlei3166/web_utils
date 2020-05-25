<template>
  <el-calendar class="calendar">
    <template v-slot:dateCell="{date, data}">
      <div class="day" :class="isSelected(data.day) ? 'is-selected' : ''" @mousedown="onMousedown(data.day)" @mouseup="onMouseup(data.day)">
        <span class="day-text">{{ data.day.split('-').slice(1).join('-') }}</span>
        <i v-show="isSelected(data.day)" class="el-icon-check day-icon"></i>
      </div>
    </template>
  </el-calendar>
</template>
<script>
  export default {
    props: {
      value: { type: Array, default: () => [] }
    },
    data () {
      return {
        dates: [],
        start: ''
      }
    },
    watch: {
      value (val) {
        this.dates = val
      }
    },
    methods: {
      isSelected (day) {
        const index = this.dates.findIndex(x => x === day)
        return index !== -1
      },
      onMousedown (start) {
        this.start = start
      },
      onMouseup (end) {
        const start = this.start
        const startTime = new Date(start.replace(/-/g, '/'))
        const endTime = new Date(end.replace(/-/g, '/'))
        const t = new Date()
        const now = new Date(t.getFullYear(), t.getMonth(), t.getDate())
        if (startTime.valueOf() < now.valueOf() || endTime.valueOf() < now.valueOf()) {
          this.$message.error('不能选择过去日期')
          return
        }
        if (start === end) {
          const index = this.dates.findIndex(x => x === end)
          if (index !== -1) {
            this.dates.splice(index, 1)
          } else {
            this.dates.push(end)
          }
        } else {
          const gt = new Date(start) > new Date(end)
          const _start = gt ? end : start
          const _end = gt ? start : end
          this.dates.push(...this.getSlideDates(_start, _end))
          this.dates = Array.from(new Set(this.dates))
        }
        this.start = ''
        this.$emit('input', this.dates)
      },
      getSlideDates (start, end) {
        let dates = []
        const _start = start.replace(/-/g, '/')
        const _end = end.replace(/-/g, '/')
        let startTime = new Date(_start)
        let endTime = new Date(_end)
        while (endTime.getTime() - startTime.getTime() >= 0) {
          let year = startTime.getFullYear()
          let month = startTime.getMonth() + 1
          let day = startTime.getDate()
          const ymd = `${year}-${this.suppleZero(month)}-${this.suppleZero(day)}`
          dates.push(ymd)
          startTime.setDate(startTime.getDate() + 1)
        }
        return dates
      },
      suppleZero (value) {
        return value < 10 ? '0' + value : value
      }
    }
  }
</script>
<style lang="less" scoped>
  .day {
    height: 100%;
    user-select: none;
  }
  .is-selected {
    color: #1989FA;
    font-weight: 500;
  }
  .day-icon {
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
  }
</style>
