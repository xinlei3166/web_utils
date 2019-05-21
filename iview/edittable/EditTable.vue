<template>
    <div>
        <Table ref="table" :loading="loading" :border="border" :size="size" :height="height" :highlight-row="highlightRow" :no-data-text="noDataText"
               :no-filtered-data-text="noFilteredDataText" @on-current-change="onCurrentChange"
               @on-row-dblclick="onRowDbclick" @on-select="onSelect" @on-select-all="onSelectAll"
               @on-selection-change="onSelectionChange" :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from "vue-class-component";

    @Component({
        props: {
            columns: {type: Array, required: true},
            data: {type: Array, required: true},
            size: {type: String, default: 'default'},
            height: {type: Number, default: null},
            highlightRow: {type: Boolean, default: true},
            border: {type: Boolean, default: true},
            loading: {type: Boolean, default: false},
            noDataText: {type: String, default: '暂无数据'},
            noFilteredDataText: {type: String, default: '没有找到你要搜索的数据'},
        }
    })
    export default class EditTable extends Vue {

        created() {
            for (let col of this.columns) {
                let render = (h, params, data) => {
                };
                // 如果存在过滤选项
                if (col.edit) {
                    let data = this.data;
                    //过滤为下拉选择框
                    if (col.edit.type && col.edit.type === 'Select') {
                        render = (h, params) => { // params：ivew table 数据，data: vue 组件内表格的数据
                            return h(col.edit.type, {
                                props: {
                                    value: data[params.index][col.key],   // Select选项列表一般 '' 或 null 为全部
                                    placeholder: col.edit.placeholder ? col.edit.placeholder : "请选择",
                                    size: col.edit.size ? col.edit.size : 'default'
                                },
                                style: {
                                    width: col.width ? col.width - 40 + 'px' : null,
                                    margin: col.edit.margin ? col.edit.margin : '5px auto'
                                },
                                on: {
                                    'on-change': (val) => {
                                        params.row[col.key] = val;
                                        data[params.index] = params.row;
                                    }
                                }
                            }, this.createOptionsRender(col, h));
                        }
                    } else if (col.edit.type && col.edit.type === 'Input') {
                        // 如果是输入框
                        render = (h, params) => {
                            return h(col.edit.type, {
                                props: {
                                    value: data[params.index][col.key],
                                    type: col.edit.stype ? col.edit.stype : 'text',
                                    placeholder: col.edit.placeholder ? col.edit.placeholder : "",
                                    size: col.edit.size ? col.edit.size : 'default'
                                },
                                style: {
                                    width: col.width ? col.width - 40 + 'px' : null,
                                    margin: col.edit.margin ? col.edit.margin : '5px auto'
                                },
                                on: {
                                    input: val => {
                                        params.row[col.key] = val;
                                        data[params.index] = params.row;
                                    }
                                }
                            })
                        };
                    } else if (col.edit.type && col.edit.type === 'DatePicker') {
                        // 如果是时间框
                        render = (h, params) => {
                            return h(col.edit.type, {
                                props: {
                                    value: data[params.index][col.key],
                                    type: col.edit.stype ? col.edit.stype : "date",
                                    placement: "bottom-end",
                                    placeholder: col.edit.placeholder ? col.edit.placeholder : "选择日期",
                                    size: col.edit.size ? col.edit.size : 'default'
                                },
                                style: {
                                    width: col.width ? col.width - 40 + 'px' : null,
                                    margin: col.edit.margin ? col.edit.margin : '5px auto'
                                },
                                on: {
                                    'on-change': (val) => {
                                        params.row[col.key] = val;
                                        data[params.index] = params.row;
                                        // data[params.index][col.key] = val;
                                    },
                                }
                            })
                        };
                    }
                    this.$set(col, 'render', render);
                }
            }
        }

        createOptionsRender(col, h) {
            // 选项渲染
            let optionRender = [];
            if (col.edit.options) {
                let options = col.edit.options;
                for (let option of options) {
                    optionRender.push(h('Option', {
                        props: {
                            value: option.value
                        }
                    }, option.name))
                }
            }
            return optionRender;
        }

        onCurrentChange(currentRow, oldCurrentRow) {
            this.$emit('on-current-change', currentRow, oldCurrentRow)
        }

        onRowDbclick(currentRow, index) {
            this.$emit('on-row-dblclick', currentRow, index)
        }

        onSelect(selection, row) {
            this.$emit('on-select', selection, row)
        }

        onSelectAll(selection) {
            this.$emit('on-select-all', selection)
        }

        onSelectionChange(selection) {
            this.$emit('on-selection-change', selection)
        }
    }
</script>

<style lang="stylus" scoped>
</style>
