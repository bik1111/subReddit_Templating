const express = require('express');
const app = express()
const path = require('path');
const redditData = require('./data.json')

app.use(express.static('public'))
//다른 경로에 가있어도 css 적용시킬 수 있음
app.use(express.static(path.join(__dirname, 'public')))

//ejs 사용한다고 express에게 알리기
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

//views가 default 파일이라 경로따로 설정 X
// hoeme.ejs 할 필요 없음 app.set 에서 ejs 사전언급.
app.get('/', (req,res) => {
    res.render('home')
})

app.get('/cats', (req,res) => {
    const cats=  [
        'blue', 'monty', 'Rocket', 'Winston', 'Mooki'
    ]
    res.render('cats', {cats} )
})

app.get('/r/:subreddit', (req,res) =>{
    //html에서 변수로 사용하기 위해 subreddit 변수 생성 (req.params)
    const {subreddit} = req.params;
    const data = redditData[subreddit]; //data.json에서 데이터 가져오기
    if(data) {
        res.render('subreddit', {...data}); //데이터를 객체로 옮기는 대신 아싸리 객체 안에 펼쳐버리기
        //작은따옴표 subreddit은 템플릿명, 뒤에 subreddit은 들어가는 변수명
    } else {
        res.render("notfound", {subreddit}) // " "안에 들어간건 템플릿(ejs 확장자 파일)
    }

})

//rand는 주소창에 치는값 , random은 ejs 파일명
app.get('/rand', (req,res) => {
    const num = Math.floor(Math.random() * 10) +1
    res.render('random', {rand : num})
})

app.listen(8080, () => {
    console.log("Connected to 8080")
})