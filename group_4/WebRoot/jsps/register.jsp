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
<body class="bg">

<header>
    <div>
        <div class="nav">
            <ul>
                <li><a href="<c:url value='/jsps/rank.jsp'/>" >排行榜</a></li>
                <li><a href="<c:url value='/index.jsp'/>" >约跑</a></li>
                <li><a href="<c:url value='/AppiontmentServlet?method=loadMyInfo'/>" >个人资料</a></li>
                <li><a href="<c:url value='/jsps/creatshare.jsp'/>" >联系CreatShare</a></li>
            </ul>
        </div>
    </div>
</header>

<main id="main">
    <div class="login">
    ${msg }
        <form action="<c:url value='/UserServlet'/>" method="post" style="margin-top: 0px">
        	<input type="hidden" name="method" value="register">
            <div>
                学号：<input type="text" name="cid" id="sno">
            </div>
            <div>
                班级：<input type="text" name="uclass" id="sno">
            </div>
            <div>
               姓名：<input type="text" name="uname" id="sno">
            </div>
            <div>
                电话：<input type="text" name="tel" id="sno">
            </div>
             <div>
                微信：<input type="text" name="weixin" id="sno">
            </div>
            <div>
                密码：<input type="password" name="password" id="sps">
            </div>
            <button style="margin-top: 0px"><input type="submit" value="注册"/></button>
        </form>
    </div>

</main>





</body>
</html>