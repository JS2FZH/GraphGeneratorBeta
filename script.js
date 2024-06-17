//動的に系列生成
function adddata(count) {
    const container = document.getElementById('datacont');
    const currentCountElement = document.getElementById('dataCurrentCount');
    let currentCount = parseInt(currentCountElement.textContent);

    for (let i = 1; i <= count; i++) {
        const index = currentCount + i;
        const elements = `
            <div class="markerframe">
                <h3>系列${index}
                <input type="checkbox" id="cbdata${index}" checked/>
                </h3>
                <div class="field">
                    <div class="labelField">
                        <a>x座標</a>
                        <br/>
                        <textarea id="datax${index}" rows="10" cols="7"></textarea>
                    </div>
                    <div class="labelField">
                        <a>y座標</a>
                        <br/>
                        <textarea id="datay${index}" rows="10" cols="7"></textarea>
                    </div>
                    <div class="labelField">
                        <br/>
                        <a>系列名(任意)</a>
                        <input id="label${index}" type="text"/>
                        <br/>
                        <a>マーカー種類</a>
                        <select id="marker${index}">
                            <option value="." selected>点・</option>
                            <option value=",">四角形□</option>
                            <option value="^">上向き三角形▲</option>
                            <option value="v">下向き三角形▼</option>
                            <option value="o">円</option>
                            <option value="<">左向き三角形</option>
                            <option value=">">右向き三角形</option>
                            <option value="1">Y字</option>
                            <option value="2">Y字(上下反転)</option>
                            <option value="3">Y字(90度時計回り)</option>
                            <option value="4">Y字(90度反時計回り)</option>
                            <option value="8">八角形</option>
                            <option value="s">四角形</option>
                            <option value="p">五角形</option>
                            <option value="*">星</option>
                            <option value="h">六角形(縦長)</option>
                            <option value="H">六角形(横長)</option>
                            <option value="+">プラス+</option>
                            <option value="x">バツ×</option>
                            <option value="D">菱形(ダイヤモンド)</option>
                            <option value="d">細い菱形 (ダイヤモンド)</option>
                            <option value="|">縦線</option>
                            <option value="_">横線</option>
                            <option value="">マーカーなし</option>
                        </select>
                        <br/>
                        <a>マーカーサイズ</a>
                        <input id="size${index}" type="text" value="20" class="num"/>
                        <br/>
                        <a>色</a>
                        <select id="color${index}">
                            <option value="k">black</option>
                            <option value="w" selected>white</option>
                            <option value="b">blue</option>
                            <option value="g">green</option>
                            <option value="r">red</option>
                            <option value="m">magenta</option>
                            <option value="y">yellow</option>
                            <option value="0.1">gray1(near black)</option>
                            <option value="0.2">gray2</option>
                            <option value="0.3">gray3</option>
                            <option value="0.4">gray4</option>
                            <option value="0.5">gray5</option>
                            <option value="0.6">gray6</option>
                            <option value="0.7">gray7</option>
                            <option value="0.8">gray8</option>
                            <option value="0.9">gray9(near white)</option>
                        </select>
                        <br/>
                        <a>枠色</a>
                        <select id="ec${index}">
                            <option value="k" selected>black</option>
                            <option value="w">white</option>
                            <option value="b">blue</option>
                            <option value="g">green</option>
                            <option value="r">red</option>
                            <option value="m">magenta</option>
                            <option value="y">yellow</option>
                            <option value="0.1">gray1(near black)</option>
                            <option value="0.2">gray2</option>
                            <option value="0.3">gray3</option>
                            <option value="0.4">gray4</option>
                            <option value="0.5">gray5</option>
                            <option value="0.6">gray6</option>
                            <option value="0.7">gray7</option>
                            <option value="0.8">gray8</option>
                            <option value="0.9">gray9(near white)</option>
                        </select>
                    </div>
                </div>
                <br/>
                <h4>エラーバー(不確かさバー)</h4>
                <div class="field">
                    <div class="labelField">
                        <a>xの誤差</a>
                        <input id="cbxerr${index}" type="checkbox" />
                        <br/>
                        <a>(両誤差or左誤差,右誤差)</a>
                        <br/>
                        <textarea id="x_err${index}" rows="10" cols="7"></textarea>
                    </div>
                    <div class="labelField">
                        <a>yの誤差</a>
                        <input id="cbyerr${index}" type="checkbox" />
                        <br/>
                        <a>(両誤差or下誤差,上誤差)</a>
                        <br/>
                        <textarea id="y_err${index}" rows="10" cols="7"></textarea>
                    </div>
                    <div class="labelField">
                        <a>エラーバー幅</a>
                        <input id="errlinewidth${index}" type="text" value="1"  class="num"/>
                        <br/>
                        <a>キャップサイズ</a>
                        <input id="errcapsize${index}" type="text" value="5"  class="num"/>
                        <br/>
                        <a>色</a>
                        <select id="errbarcolor${index}">
                            <option value="k" selected>black</option>
                            <option value="w">white</option>
                            <option value="b">blue</option>
                            <option value="g">green</option>
                            <option value="r">red</option>
                            <option value="m">magenta</option>
                            <option value="y">yellow</option>
                            <option value="0.1">gray1(near black)</option>
                            <option value="0.2">gray2</option>
                            <option value="0.3">gray3</option>
                            <option value="0.4">gray4</option>
                            <option value="0.5">gray5</option>
                            <option value="0.6">gray6</option>
                            <option value="0.7">gray7</option>
                            <option value="0.8">gray8</option>
                            <option value="0.9">gray9(near white)</option>
                        </select>
                    </div>
                </div>
            <br/>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', elements);
    }

    currentCount += count;
    currentCountElement.textContent = currentCount;
}

//動的に近似曲線生成
function addcurve(count) {
    const container = document.getElementById('curvecont');
    const currentCountElement = document.getElementById('curveCurrentCount');
    let currentCount = parseInt(currentCountElement.textContent);

    for (let i = 1; i <= count; i++) {
        const index = currentCount + i;
        const elements = `
            <div class="markerframe">
                <h3>近似曲線${index}
                <input type="checkbox" id="cbcurve${index}" checked/>
                </h3>
                <a>式</a>
                <input id="equation${index}" type="text"/>
                <br/>
                <a>線幅</a>
                <input id="linewidth${index}" type="text" value="1" class="num"/>
                <a>色</a>
                <select id="curvecolor${index}">
                    <option value="k" selected>black</option>
                    <option value="w">white</option>
                    <option value="b">blue</option>
                    <option value="g">green</option>
                    <option value="r">red</option>
                    <option value="m">magenta</option>
                    <option value="y">yellow</option>
                    <option value="0.1">gray1(near black)</option>
                    <option value="0.2">gray2</option>
                    <option value="0.3">gray3</option>
                    <option value="0.4">gray4</option>
                    <option value="0.5">gray5</option>
                    <option value="0.6">gray6</option>
                    <option value="0.7">gray7</option>
                    <option value="0.8">gray8</option>
                    <option value="0.9">gray9(near white)</option>
                </select>
                <a>線スタイル</a>
                <select id="linestyle${index}">
                    <option value="-" selected>solid line</option>
                    <option value="--">dashed line</option>
                    <option value="-.">dash-dot line</option>
                    <option value=":">dotted line </option>
                </select>
                <br/>
            </div>
            
        `;
        container.insertAdjacentHTML('beforeend', elements);
    }

    currentCount += count;
    currentCountElement.textContent = currentCount;
}

//動的にテキスト追加生成
function addtext(count){
    const container = document.getElementById('textcont');
    const currentCountElement = document.getElementById('textCurrentCount');
    let currentCount = parseInt(currentCountElement.textContent);

    for (let i = 1; i <= count; i++) {
        const index = currentCount + i;
        const elements = `
            <div class="markerframe">
                <h3>テキスト${index}
                <input id="cbtext${index}" type="checkbox" checked/>
                </h3>
                <a>テキスト</a>
                <input id="text${index}" type="text"/>
                <br/>
                <a>位置x座標</a>
                <input id="textx${index}" type="text" class="num"/>
                <a>y座標</a>
                <input id="texty${index}" type="text" class="num"/>
                <br/>
                <a>フォントサイズ</a>
                <input id="textfontsize${index}" type="text" value="10" class="num"/>
                <a>色</a>
                <select id="textcolor${index}">
                    <option value="k" selected>black</option>
                    <option value="w">white</option>
                    <option value="b">blue</option>
                    <option value="g">green</option>
                    <option value="r">red</option>
                    <option value="m">magenta</option>
                    <option value="y">yellow</option>
                    <option value="0.1">gray1(near black)</option>
                    <option value="0.2">gray2</option>
                    <option value="0.3">gray3</option>
                    <option value="0.4">gray4</option>
                    <option value="0.5">gray5</option>
                    <option value="0.6">gray6</option>
                    <option value="0.7">gray7</option>
                    <option value="0.8">gray8</option>
                    <option value="0.9">gray9(near white)</option>
                </select>
                <br/>
            </div>
            <br/>
        `;
        container.insertAdjacentHTML('beforeend', elements);
    }
    currentCount += count;
    currentCountElement.textContent = currentCount;
}

//動的に矢印追加生成
function addanno(count){
    const container = document.getElementById('annocont');
    const currentCountElement = document.getElementById('annoCurrentCount');
    let currentCount = parseInt(currentCountElement.textContent);

    for (let i = 1; i <= count; i++) {
        const index = currentCount + i;
        const elements = `
            <div class="markerframe">
                <h3>矢印${index}
                    <input id="cbanno${index}" type="checkbox" checked/>
                </h3>
                <a>表示文字列(任意)</a>
                <input id="annotext${index}"  type="text" />
                <br/>
                <a>始点x</a>
                <input id="annostartx${index}" type="text" class="num"/>
                <a>始点y</a>
                <input id="annostarty${index}" type="text" class="num"/>
                <a>終点x</a>
                <input id="annostopx${index}" type="text" class="num"/>
                <a>終点y</a>
                <input id="annostopy${index}" type="text" class="num"/>
                <br/>
                <a>線幅</a>
                <input id="annowidth${index}" type="text" value="1" class="num"/>
                <a>矢印の幅</a>
                <input id="annoheadwidth${index}" type="text" value="7" class="num"/>
                <a>矢印の長さ</a>
                <input id="annoheadlength${index}" type="text" value="7" class="num"/>
                <br/>
                <a>線色</a>
                <select id="annocolor${index}">
                    <option value="k" selected>black</option>
                    <option value="w">white</option>
                    <option value="b">blue</option>
                    <option value="g">green</option>
                    <option value="r">red</option>
                    <option value="m">magenta</option>
                    <option value="y">yellow</option>
                    <option value="0.1">gray1(near black)</option>
                    <option value="0.2">gray2</option>
                    <option value="0.3">gray3</option>
                    <option value="0.4">gray4</option>
                    <option value="0.5">gray5</option>
                    <option value="0.6">gray6</option>
                    <option value="0.7">gray7</option>
                    <option value="0.8">gray8</option>
                    <option value="0.9">gray9(near white)</option>
                </select>
                <a>枠色</a>
                <select id="annoedgecolor${index}">
                    <option value="k" selected>black</option>
                    <option value="w">white</option>
                    <option value="b">blue</option>
                    <option value="g">green</option>
                    <option value="r">red</option>
                    <option value="m">magenta</option>
                    <option value="y">yellow</option>
                    <option value="0.1">gray1(near black)</option>
                    <option value="0.2">gray2</option>
                    <option value="0.3">gray3</option>
                    <option value="0.4">gray4</option>
                    <option value="0.5">gray5</option>
                    <option value="0.6">gray6</option>
                    <option value="0.7">gray7</option>
                    <option value="0.8">gray8</option>
                    <option value="0.9">gray9(near white)</option>
                </select>
                <br/>
            </div>                        
            
            <br/>
        `;
        container.insertAdjacentHTML('beforeend', elements);
    }
    currentCount += count;
    currentCountElement.textContent = currentCount;
}

//画像ダウンロード fromChatGPT
document.getElementById('downloadButton').addEventListener('click', function() {
    // div内のimgタグを取得
    const imgElement = document.querySelector('#mpl img');
    if (imgElement) {
        const imgSrc = imgElement.src;
        const base64Data = imgSrc.split(',')[1]; // base64データ部分を取得
        
        // Base64データをデコード
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        
        // Blobを作成し、ダウンロードリンクを生成
        const blob = new Blob([byteArray], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        
        // ダウンロードリンクを作成してクリック
        const link = document.createElement('a');
        link.href = url;
        link.download = 'graph.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('画像が見つかりません。');
    }
});

function beforeUnload(event){
    event.preventDefault();
    event.returnValue = 'Check';
}

window.onbeforeunload = beforeUnload;