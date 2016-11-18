<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>running-togather</title>
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/main.css'/>">
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/normalize.css'/>">


</head>
<body>

<header>
    <div>

        <div class="search-bar"></div>
        <div class="nav">
            <ul>
                <li><a href="<c:url value='/jsps/rank.jsp'/>" >排行榜</a></li>
                <li><a href="<c:url value='/index.jsp'/>" >约跑</a></li>
                <li>个人资料</li>
                <li><a href="<c:url value='/jsps/creatshare.jsp'/>" >联系CreatShare</a></li>
            </ul>
        </div>
    </div>
</header>
<main id="main">
    <div>
        <div>
            <div class="user-info">
                <form action="<c:url value='/UserServlet'/>" method="post">
                	<input type="hidden" name="method" value="modify">
                	<input type="hidden" name="uid" value="${session_user.uid }">
                    <div><h2>修改我的信息</h2></div>
                    <div>
                        班级：<input type="text" name="uclass" value="${session_user.uclass }">
                    </div>
                    <div>
                        姓名：<input type="text" name="uname" value="${session_user.uname }">
                    </div>
                    <div>
                        签名：<input type="text" name="qianmin" value="${session_user.qianmin }">
                    </div>
                    <div>
                        微信：<input type="text" name="weixin" value="${session_user.weixin }">
                    </div>
                    <div>
                        电话：<input type="text" name="tel" value="${session_user.tel }">
                    </div>
                    <button id="commit" onclick="submit()">
                            提交
                    </button>
                </form>
            </div>
        </div>
    </div>


</main>
<footer></footer>


</body>
</html>