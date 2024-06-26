#pythonコード

import matplotlib.pyplot as plt
import matplotlib.tri as tri
import numpy as np
import matplotlib.ticker as ticker
import re
import js
import math


from matplotlib import font_manager as fm


from pyscript import display
from pyscript import document
from pyweb import pydom
from matplotlib import container
import matplotlib.collections as mcollections


tasks = []

def q(selector, root=document):
    return root.querySelector(selector)

#ここのpydomでリンク付けてるのもある
xlabel = pydom["#xlabel"][0]
ylabel = pydom["#ylabel"][0]

xlogbase = pydom["#xlogbase"][0]
ylogbase = pydom["#ylogbase"][0]

xmin = pydom["#xmin"][0]
xmax = pydom["#xmax"][0]
ymin = pydom["#ymin"][0]
ymax = pydom["#ymax"][0]

dpi_v = pydom["#dpi"][0]

mpl = pydom["#mpl"][0]

#実行ボタン押すとここの関数が走る
def gen(e):

    plt.clf()   #グラフリセット
    pydom["div#mpl"].html = ""  #divの中リセット

    n = int(get_id("dataCurrentCount").text)   #現在の要素数を確認

    fm.fontManager.addfont("ipaexm.ttf")

    #フォント設定
    plt.rcParams['font.family'] = 'IPAexMincho' # font familyの設定
    plt.rcParams["font.size"] = 10 # 全体のフォントサイズが変更されます。


    #軸設定
    plt.rcParams['xtick.direction'] = 'in' #x軸の目盛りの向き
    plt.rcParams['ytick.direction'] = 'in' #y軸の目盛りの向き
    plt.rcParams["xtick.minor.visible"] = True  #x軸補助目盛りの追加
    plt.rcParams["ytick.minor.visible"] = True  #y軸補助目盛りの追加

    #凡例設定
    plt.rcParams["legend.fancybox"] = False  # 丸角OFF
    plt.rcParams["legend.framealpha"] = 1  # 透明度の指定、0で塗りつぶしなし
    plt.rcParams["legend.edgecolor"] = 'black'  # edgeの色を変更

    #dpi(解像度)指定
    plt.figure(dpi=float(dpi_v.value))

    #表示値範囲指定
    plt.xlim(float(xmin.value), float(xmax.value))
    plt.ylim(float(ymin.value), float(ymax.value))

    #プロット
    for plot_i in range(n) :
        data_plot(plt, plot_i + 1)

    #テキスト追加
    text_n = int(get_id("textCurrentCount").text)   #現在の要素数を確認
    for text_i in range(text_n):
        add_text(plt, text_i + 1)

    #矢印追加
    anno_n = int(get_id("annoCurrentCount").text)   #現在の要素数を確認
    for anno_i in range(anno_n):
        add_anno(plt, anno_i + 1)
    
    #軸label指定
    plt.xlabel(xlabel.value, fontsize=float(get_id("xlabelsize").value)) #例"$\it{V}$/V"
    plt.ylabel(ylabel.value, fontsize=float(get_id("ylabelsize").value)) #例"$\mathregular{\overline{\mathit{I}}}$/nA")

    #対数軸設定
    if get_id("cbx_log").checked :
        if xlogbase.value == "" :
            plt.xscale("log")
            plt.gca().xaxis.set_major_formatter(ticker.ScalarFormatter())
        else :
            plt.xscale("log", base=float(xlogbase.value))
    if get_id("cby_log").checked :
        if ylogbase.value == "" :
            plt.yscale("log")
            plt.gca().yaxis.set_major_formatter(ticker.ScalarFormatter())
        else :
            plt.yscale("log", base=float(ylogbase.value))
    
    #系列名表示
    if get_id("cblegend").checked :
        plt.legend(markerscale=float(get_id("legendmarkerscale").value), loc=int(get_id("legendloc").value), fontsize=float(get_id("legendfontsize").value))

    #近似曲線生成
    text_n = int(get_id("curveCurrentCount").text)   #現在の要素数を確認
    for curve_i in range(text_n) :
        add_curve(plt, curve_i + 1)

    #mpl.src = plt

    display(plt.gcf(), target="mpl", append="False")    #表示

def add_task_event(e):
    if e.key == "Enter":
        gen(e)

#id取得 長いので縮小
def get_id(idname):
    return js.document.getElementById(idname)

#プロット
def data_plot(plt, n):
    n = str(n)  #文字列化
    if get_id("cbdata" + n).checked :
        #改行からリストへ
        x_data = extract_numbers(get_id("datax" + n).value.strip().split('\n'))
        y_data = extract_numbers(get_id("datay" + n).value.strip().split('\n'))

        #各データ取得
        p_l = get_id("label" + n).value
        p_s = float(get_id("size" + n).value)
        p_m = get_id("marker" + n).value
        p_c = get_id("color" + n).value
        p_ec = get_id("ec" + n).value

        #エラーバー状況
        berrx = get_id("cbxerr" + n).checked
        berry = get_id("cbyerr" + n).checked

        if berrx or berry:
            #エラーバー付き
            #改行からリストへ

            #各データ取得
            p_errlinewidth = float(get_id("errlinewidth" + n).value)
            p_errcapsize = float(get_id("errcapsize" + n).value)
            p_errbarcolor = get_id("errbarcolor" + n).value

            if berrx and berry:
                xerr_data = convert_to_err(get_id("x_err" + n).value.strip().split('\n'))
                yerr_data = convert_to_err(get_id("y_err" + n).value.strip().split('\n'))
                plt.errorbar(x_data, y_data, yerr = yerr_data, xerr = xerr_data, markersize=0, marker=p_m, c=p_c, markeredgecolor=p_ec, ls="", elinewidth=p_errlinewidth, capsize=p_errcapsize, ecolor=p_errbarcolor)
            elif berrx and (not berry):
                xerr_data = convert_to_err(get_id("x_err" + n).value.strip().split('\n'))
                plt.errorbar(x_data, y_data, xerr = xerr_data, markersize=0, marker=p_m, c=p_c, markeredgecolor=p_ec, ls="", elinewidth=p_errlinewidth, capsize=p_errcapsize, ecolor=p_errbarcolor)
            elif (not berrx) and berry:
                yerr_data = convert_to_err(get_id("y_err" + n).value.strip().split('\n'))
                plt.errorbar(x_data, y_data, yerr = yerr_data, markersize=0, marker=p_m, c=p_c, markeredgecolor=p_ec, ls="", elinewidth=p_errlinewidth, capsize=p_errcapsize, ecolor=p_errbarcolor)

        #プロット
        plt.scatter(x_data, y_data, s=p_s, marker=p_m, c=p_c, ec=p_ec, label=p_l)




        #再実行時に残ってしまうので
        label_name = None
        x_data = None
        y_data = None


# 数値を抽出してリストに変換する関数 fromChatGPT
def extract_numbers(lines):
    numbers = []
    for line in lines:
        if line.strip():  # 空行を無視
            # 行の中のすべての数値を抽出（小数点を含む）
            line_numbers = re.findall(r'-?\d+\.\d+|-?\d+', line)
            # 数値を浮動小数点数に変換してリストに追加
            numbers.extend([float(num) for num in line_numbers])
    return numbers

#テキスト生成
def add_text(plt, n):
    n = str(n)  #文字列化
    if get_id("cbtext" + n).checked :
        text_x = float(get_id("textx" + n ).value)
        text_y = float(get_id("texty" + n ).value)
        text_size = float(get_id("textfontsize" + n ).value)
        plt.text(text_x, text_y, get_id("text" + n).value, fontsize=text_size, color=get_id("textcolor" + n).value)

#近似曲線生成
def add_curve(plt, n):
    n = str(n)  #文字列化
    if get_id("cbcurve" + n).checked :
        equation = get_id("equation" + n).value     #式入力
        
        x = np.arange(float(xmin.value), float(xmax.value), 0.01)       #x配列定義

        # 安全に評価するためにmathモジュールを含める fromChatGPT
        allowed_names = {
            "math": math,
            "np": np,
            "x": x
        }
        # yを数式として評価 fromChatGPT
        y = eval(equation.split('=')[1].strip(), {"__builtins__": None}, allowed_names)
        
        #グラフにplot
        plt.plot(x, y, marker='', color=get_id("curvecolor" + n).value, linewidth=float(get_id("linewidth" + n).value), linestyle=get_id("linestyle" + n).value)

#矢印生成
def add_anno(plt, n):
    n = str(n)  #文字列化
    if get_id("cbanno" + n).checked :
        plt.annotate(get_id("annotext" + n).value,
                xy=[float(get_id("annostopx" + n).value),float(get_id("annostopy" + n).value)],
                xytext=[float(get_id("annostartx" + n).value),float(get_id("annostarty" + n).value)],
                arrowprops=dict(headwidth=float(get_id("annoheadwidth" + n).value), 
                                headlength=float(get_id("annoheadlength" + n).value),
                                width=float(get_id("annowidth" + n).value),
                                facecolor=get_id("annocolor" + n).value, 
                                edgecolor=get_id("annoedgecolor" + n).value))

#エラーバー用リスト生成 fromChatGPT
def convert_to_err(lines):    
    # yerrリストの初期化
    err = [[], []]
    
    for line in lines:
        # 各行をカンマで分割し、整数に変換します
        numbers = list(map(float, line.split(',')))
        
        # 各行をカンマで分割し、整数または浮動小数点数に変換します
        if len(numbers) == 2:
            err[0].append(numbers[0])
            err[1].append(numbers[1])
        elif len(numbers) == 1:
            err[0].append(numbers[0])
            err[1].append(numbers[0])
        else:
            raise ValueError(f"Unexpected number of elements in line: {line}")
    
    return err
