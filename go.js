// 白塊佈局格式
// 距離top上方的值 i*100
// 距離left左方的值 j*100
// 設一個倉庫來存放陣列裡面12個黑塊 預設值為0就不是黑塊 預設為1表示為黑塊
var arr = new Array();
// console.log(arr)  ---- []
var timer = 0.000;
var score = 0;
var start = 0;
var c;
var s;
var gameover=0;
$(document).ready(function () {
    init();
});
//把白塊初始化 一個大格子承載20小格子
function init() {
    // 5行
    for (var x = 0; x < 5; x++) {
        arr[x] = new Array();
        //    console.log(arr[x]) -----[]
        // 4列
        for (var y = 0; y < 4; y++) {
            var Cube = $(`#pos-${x}-${y}`);
            // 設定白色方塊的長寬樣式及給它們ID名稱
            Cube.css('top', getPosTop(x, y));
            Cube.css('left', getPosLeft(x, y));
            // 黑塊初始化  創造20格黑色方塊
            // 在content裡面再新增黑塊 class=black id=black——
            $('#boxcontent').append($(`<div class="Black" id="black-${x}-${y}"></div>`));
            // 設定黑色方塊的長寬樣式及給它們ID名稱
            var BCube = $(`#black-${x}-${y}`);
            BCube.css('top', getPosTop(x, y));
            BCube.css('left', getPosLeft(x, y));
            // 給白塊給預設值0
            arr[x][y] = 0;
        }
    }
    // 每一行需要隨機產生一個黑塊  // 注意：隨機生成的黑色方塊不能在同一列裡面
    for (var x = 0; x < 5; x++) {
        var temp = parseInt(Math.floor(Math.random() * 4));
        //現在隨機黑塊位置上和上一列黑塊位置一樣的情況下 就要再亂數一次 避免方塊在同一列裡面
        if (x > 0 && arr[x - 1][temp] == 1) {
            temp = parseInt(Math.floor(Math.random() * 4));
        }
        //取黑塊隨機的位置後新增樣式 把背景顏色改成黑色
        var black = $(`#black-${x}-${temp}`);
        black.css('background-color', 'black');
        // 給隨機產生的黑塊預設值1
        arr[x][temp] = 1;
    }
    //初始化遊戲提示
    $('#black-4-0').text('按H開始')
    $('#black-4-1').text('按J開始')
    $('#black-4-2').text('按K開始')
    $('#black-4-3').text('按L開始')
};

$(document).keydown(function (event) {
    switch (event.keyCode) {
        //   H按鍵
        case 72:
            // console.log('ok') 有敲進來
            // 先判斷是不是點擊黑塊
            // 開始計時 只有第一次點擊的時候才會初始化
            if (arr[4][0] == 1 && start == 0) {
                Timerun();
                Score();
                // 移除提示
                deleteHint();
                Move();
            } else if (arr[4][0] == 1 && start > 0 && start < 20) {
                // console.log(arr[4][0])
                Move();
                Score();
                // console('yo')
            } else {
                GameOver();
            }
            break;
        //   J按鍵
        case 74:
            // console.log('ok1') 
            if (arr[4][1] == 1 && start == 0) {
                Timerun();
                Score();
                // 移除提示
                deleteHint();
                Move();
                // 第一次正確的話 初始化
            } else if (arr[4][1] == 1 && start > 0 && start < 20) {
                // console.log(arr[4][0])
                // console.log('hi')
                Move();
                Score();
                // console('yo')
            } else {
                GameOver();
            }
            break;
        //   K按鍵
        case 75:
            // console.log('ok2')
            if (arr[4][2] == 1 && start == 0) {
                Timerun();
                Score();
                // 移除提示
                deleteHint();
                Move();
                // 第一次正確的話 初始化
            } else if (arr[4][2] == 1 && start > 0 && start < 20) {
                // console.log(arr[4][0])
                Move();
                Score();
                // console('yo')
            } else {
                GameOver();
            }
            break;
        //   L按鍵
        case 76:
            if (arr[4][3] == 1 && start == 0) {
                Timerun();
                Score();
                // 移除提示
                deleteHint();
                Move();
                // 第一次正確的話 初始化
            } else if (arr[4][3] == 1 && start > 0 && start < 20) {
                // console.log(arr[4][0])
                Move();
                Score();
                // console('yo')

            } else {
                GameOver();
            }
            break;
    };
    // 移動條件
    // 1.是黑色方塊 2.在移動前要先尋訪所有方塊 
    // 3.在前面判定好是黑色格子時 每一格格子都要往下移動  4.最後要在最上面新增新的黑色方塊
    function Move() {
        for (var i = 4; i >= 0; i--) {
            for (var j = 3; j >= 0; j--) {
                // console.log('hi')
                // 判斷黑塊
                if (arr[i][j] == 1) {
                    // console.log('hi')
                    // 點擊最下面黑色方塊的時候 黑色方塊要變成白色方塊 
                    if (i == 4) {
                        $(`#black-${i}-${j}`).css('background-color', 'white');
                        arr[i][j] = 0;
                    } else {
                        // 其他格子要往下移動
                        // 移動的條件是 行數少（原來的黑塊位置）的要往行數多的地方（後來的黑塊位置）移動
                        // 行數少的要改變成白色方塊 行數多的要改變成黑色方塊
                        // 同時最上面要再亂數產生新的黑色方塊
                        // 原來的黑色方塊還是要變成白色方塊
                        $(`#black-${i}-${j}`).css('background-color', 'white');
                        arr[i][j] = 0;
                        // console.log('hi')
                        $(`#black-${i + 1}-${j}`).css('background-color', 'black');
                        arr[i + 1][j] = 1;
                        // console.log('hi2') 
                    }
                }
            }
        }
        //還要在第一行產生新的黑色方塊
        var temp = parseInt(Math.floor(Math.random() * 4));
        // console.log(temp)
        var black = $(`#black-0-${temp}`).css('background-color', 'black');
        arr[0][temp] = 1;
        start += 1;
        score+1;
    }
    function GameOver() {
        // 停止計時
        clearTimeout(c);
        // 沒有停止掉
        // 出現遊戲結束提示
        // 當遊戲結束的第一次值是零就執行
        if( gameover == 0 ){
        $('#boxcontent').append(`<div class="gamehint" id="gamehint"><p id="p1">你的分數是:<p>
        <span id="s1">${score}</span><p id="p2">用時:</p><span id="s2">${timer.toString().substr(0, 5)}</span><p id="p3">秒</p>
        <a href='javascript:restartGame();' id="restartGamebutton"> Restart </a></div>`)
        $('#gamehint').css({
            'width': '404px',
            'height': '504px',
            'background-color': 'rgb(0,0,0,0.5)',
            'top': '0',
            'display': 'block',
            'margin': '0 auto',
            'text-align': 'center',
            'position': 'absolute'
        });
        // 之後就不斷新增 就可以避免掉重複產生的情況
        gameover++;
    }
    }
});
function deleteHint() {
    $('#black-4-0').text('');
    $('#black-4-1').text('');
    $('#black-4-2').text('');
    $('#black-4-3').text('');
}
function Timerun() {
    timer += 0.001;
    $('span').text(timer.toString().substr(0, 5));
    // console.log('ok')  
    c = setTimeout('Timerun()', 1);
}
function restartGame() {
    // 去掉遊戲提示內容
    $('#gamehint').remove();
    // 把遊戲計時器歸零
    $('#timebox').html('<span>0.000</span>秒</div>');
    $('#score').html('0');
    // 把上一次的結果清除
    $('.Black').remove();
    // 將統計遊戲次數歸零
    start = 0;
    // 將分數結果歸零
    score = 0;
    // 將提示結果統計次數清除
    gameover=0;
    // 重新初始化
    init();
}
function Score() {
    // 判斷 當敲擊黑塊的時候才會加分   
    //  在遊戲結束的時候不能再按下去
    if (arr[4][0] == 1 && gameover==0) {
         score += 1;
         $('#score').text(score);
        //  console.log(score)
    } else if (arr[4][1] ==1 && gameover==0) {
        // console.log('bee')
        score += 1;
        $('#score').text(score);
    } else if (arr[4][2] == 1 && gameover==0) {
        // console.log('cat')
        score += 1;
        $('#score').text(score);
    } else if (arr[4][3] == 1 && gameover==0) {
        // console.log('dog')
        score += 1;
        $('#score').text(score);

    }
}

window.addEventListener("keydown", playMusic);
function playMusic(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // console.log(audio);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    // console.log(key);
    if (!audio ) return;
    // audio.stopPropagation()  undefined 
    //每次點開的時候初始化重新播放
    audio.currentTime = 0;
    audio.play();
    audio.classList.add('Playing');
}
function move(e) {
    this.classList.remove();
}

window.addEventListener("click", playMusic);
const keys = document.querySelectorAll('.key');
for (const k of keys) {
    k.addEventListener("transitionend", remove);
}

function getPosTop(x, y) {
    return x * 100;
}
function getPosLeft(x, y) {
    return y * 100;
}
// 當遊戲結束的時候 不要再按黑色按鍵？
