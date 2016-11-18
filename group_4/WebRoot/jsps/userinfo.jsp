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
    <div >
        <div>
            <div class="user-info">
                <div><img src="<c:url value='/images/portrait-1.png'/>" alt="portrait-1"/></div>
                <div>
                    <span>${session_user.uclass }</span>
                    <span>${session_user.uname }</span>
                    <span>[约跑成功次数：${session_user.success }次]</span>
                </div>

                <div>
                    <p>${session_user.qianmin }</p>
                </div>
                <div>
                    <span><img src="<c:url value='/images/weixin.png'/>" alt="weixin"/></span>
                    <span>${session_user.weixin }</span>
                    <span><img src="<c:url value='/images/phone.png'/>" alt="phone"/></span>
                    <span>${session_user.tel }</span>
                </div>
                <a href="<c:url value='/jsps/modify.jsp'/>"><button>修改</button></a>
            </div>
            <div class="run-info">
                <div>
                    <div>已发布信息：</div>
                    <div>
                    	<c:forEach items="${appointments }" var="appointment">
                    		<p>${appointment.describe}
                    			<c:if test="${!empty appointment.responder_uid}">
                    				<a href="<c:url value='/UserServlet?method=showUser&uid=${appointment.responder_uid }'/>"  class="underline">约友</a>
                    			</c:if>
                    		</p>
                    	</c:forEach>
                    </div>
                </div>
                <div>
                    <div>联络过的小伙伴：</div>
                    <div>
                    	<c:forEach items="${friends }" var="friend">
                    		<p>
	                            <span>${friend.author.uname }</span>
	                            <span><a class="underline">${friend.author.tel }</a></span>
                        	</p>
                    	</c:forEach>
                    </div>
                </div>
            </div>
        </div>
    </div>


</main>
<footer></footer>


</body>
</html>