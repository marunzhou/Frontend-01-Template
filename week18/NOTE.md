# Dev工具
    - Server
        - build: webpack babel vue jsx postcss
        - watch: fsEvent
        - mock: 
        - http: ws
    - client
        - debugger: vscode devtool
        - source map

# 关于webpack中想用import
    - nodeJs升到最高版本
    - package.json 中配置 "type": "module"

# 单元测试 unit-test
    - 建议用在基础库，组件层的代码 不建议用在ui上
    - 单元测试的目标
        1. 自动化的结果评判 （检查case是否符合）
        2. 测试用例(case)管理
    - 单元测试编写质量
        - 检测单元测试的测试用例
        - 目标代码的覆盖程度
    - 单元测试90%以上 需要关注行覆盖率

# [mocha]("https://mochajs.org/")

# nyc
    - 创建nycrc文件 配置要覆盖的文件

# [ava]("https://github.com/avajs/ava")
    
# babel
    - 编译到指定目录 babel ./src/add.js > ./dist/add.js