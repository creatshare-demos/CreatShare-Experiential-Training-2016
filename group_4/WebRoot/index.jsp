<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
        <div class="btn-login">
            <a href="<c:url value='/jsps/register.jsp'/>"><button>注册</button></a>
            <c:choose>
		       <c:when test="${empty session_user}">
		            <a href="<c:url value='/jsps/login.jsp'/>"><button>登录</button></a>
		       </c:when>
		        <c:otherwise>
		            <button>${session_user.uname},你好！</button>
		            <a href="<c:url value='/UserServlet?method=quit'/>"><button>注销</button></a>
		        </c:otherwise>
	         </c:choose>
        </div>
        <div class="nav">
            <ul>
                <li><a href="<c:url value='/jsps/rank.jsp'/>" >排行榜</a></li>
                <li>约跑</li>
                <li><a href="<c:url value='/AppiontmentServlet?method=loadMyInfo'/>" >个人资料</a></li>
                <li><a href="<c:url value='/jsps/creatshare.jsp'/>" >联系CreatShare</a></li>
            </ul>
        </div>
    </div>
</header>
<main id="main">
    <div>
        <div>
        <c:forEach items="${appointments }" var="appointment">
            <div id="card">
                <div class="portrait">
                    <img src="<c:url value='/images/portrait.png'/>" alt="portrait">
                </div>
                	<div class="content">
                    <span>${appointment.author.uname }<img src="<c:url value='/images/female.png'/>"></span>
                    <p>${appointment.describe}</p>
	                </div>
	                <div class="time">
	                    <span>${fn:substring(appointment.date,0,10)}</span>
	                </div>
	                <c:if test="${appointment.author_uid != session_user.uid}">
	                <a href="<c:url value='/UserServlet?method=showUser&uid=${appointment.author_uid }&rid=${appointment.rid }'/>">
	                	<button class="btn-login" style="height: 35px;width: 100px">约跑</button>
	                </a>
	                </c:if>
	                
            </div>
            </c:forEach>
        </div>
        <div class="release">
            <form action="<c:url value='/AppiontmentServlet'/>" method="post">
            	<input type="hidden" name="method" value="issue"/>
                <input type="text" class="input" name="describe" placeholder="想怎么约？在这里输入">
                <input type="submit" id="btn" value="发布">
            </form>
        </div>
    </div>


</main>

<footer></footer>


</body>
</html>
