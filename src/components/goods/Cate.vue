<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog()">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 树表格 -->
      <tree-table
        class="treeTable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template v-slot:isok="scope">
          <!-- 新写法 -->
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level === 1" type="success" size="mini">二级</el-tag>
          <el-tag v-else type="warning" size="mini">三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="openEdit(scope.row.cat_id, scope.row.cat_name)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteCate(scope.row.cat_id)"
          >删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加商品分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 添加分类的表单对象 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- options 指定数据源 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            clearable
            @change="parentCateChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改商品分类对话框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editCateDialogVisible"
      width="50%"
      @close="editCateDialogClosed"
    >
      <!-- 添加分类的表单对象 -->
      <el-form
        :model="editCateForm"
        :rules="editCateFormRules"
        ref="editCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0, //总数据条数
      cateList: [], //商品分类数据列表,默认空
      //树表格列数据
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          //当前列类型为模板
          type: "template",
          //当前列使用的名称
          template: "isok"
        },
        {
          label: "排序",
          //当前列类型为模板
          type: "template",
          //当前列使用的名称
          template: "order"
        },
        {
          label: "操作",
          //当前列类型为模板
          type: "template",
          //当前列使用的名称
          template: "opt"
        }
      ],
      addCateDialogVisible: false, //控制添加分类对话框的显示与隐藏
      addCateForm: {
        cat_name: "", //添加分类的名称
        cat_pid: 0, //父级分类的ID
        cat_level: 0 //分类登记
      },
      //验证规则对象
      addCateFormRules: {
        cat_name: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur"
          }
        ]
      },
      //父级分类的列表
      parentCateList: [],
      //指定级联选择器的配置对象
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
        expandTrigger: "hover",
        checkStrictly: true
      },
      //选中的父级分类的id数组
      selectedKeys: [],
      editCateDialogVisible: false, //编辑分类对话框显示与隐藏
      editCateForm: {
        cat_name: "", //添加分类的名称
        editCateId: "" //需要被编辑的商品ID
      },
      //验证规则对象
      editCateFormRules: {
        cat_name: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur"
          }
        ]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error("获取商品分类失败")
      console.log(res)
      if (res.data.pagenum * res.data.pagesize == res.data.total) {
        this.queryInfo.pagenum = this.queryInfo.pagenum - 1
        this.getCateList()
      }
      this.cateList = res.data.result
      this.total = res.data.total
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getCateList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getCateList()
      console.log(`当前页: ${val}`)
    },
    //点击添加分类按钮,展示添加分类对话框
    showAddCateDialog() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    //获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 }
      })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error("获取分类列表数据失败!")
      this.parentCateList = res.data
    },
    parentCateChange() {
      // 如果selectedKeys 数据中的length大于0,证明选中的父级分类,反之没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateForm.cat_level = this.selectedKeys.length //添加分类的等级
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    //点击添加分类按钮,
    addCate() {
      console.log(this.addCateForm)
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return

        const { data: res } = await this.$http.post("categories", this.addCateForm)
        console.log(res)
        if (res.meta.status !== 201) return this.$message.error("添加分类失败!")
        this.$message.success("添加分类成功!")
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },
    async deleteCate(id) {
      console.log(id)
      const confirmResult = await this.$confirm("此操作会永久删除该商品分类,是否删除:", "系统提示").catch(err => err)
      console.log(confirmResult)
      if (confirmResult === "confirm") {
        const { data: res } = await this.$http.delete("categories/" + id)
        if (res.meta.status !== 200) return this.$message.error("删除失败")
        this.$message.success("删除成功")
        this.getCateList()
      } else {
        this.$message.info("已取消删除该商品分类")
      }
    },
    editCateDialogClosed() {
      this.editCateForm.editCateId = ""
      this.$refs.editCateFormRef.resetFields()
    },
    openEdit(id, catName) {
      this.editCateForm.editCateId = id
      this.editCateForm.cat_name = catName
      this.editCateDialogVisible = true
    },
    async editCate() {
      console.log(this.editCateForm)
      const { data: res } = await this.$http.put("categories/" + this.editCateForm.edit, { cat_name: this.editCateForm.cat_name })
      if (res.meta.status !== 200) return this.$message.error("修改失败")
      this.$message.success("修改成功")
      this.getCateList()
      this.editCateDialogVisible = false
    }
  }
}
</script>
<style lang="less" scopes>
  .treeTable {
    margin-top: 15px;
  }
  .pagination {
    margin-top: 10px;
  }
  .el-cascader {
    width: 100%;
    overflow: auto;
  }
  .el-cascader-panel {
    height: 200px;
  }
</style>