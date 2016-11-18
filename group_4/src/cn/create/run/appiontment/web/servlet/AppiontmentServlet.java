package cn.create.run.appiontment.web.servlet;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.create.run.appiontment.domain.Appiontment;
import cn.create.run.appiontment.service.AppiontmentService;
import cn.create.run.user.domain.User;
import cn.itcast.commons.CommonUtils;
import cn.itcast.servlet.BaseServlet;

public class AppiontmentServlet extends BaseServlet {
	private AppiontmentService appiontmentService = new AppiontmentService();
	
	public String issue(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		User user = getUser(request);
		if(user==null){
			request.setAttribute("msg", "您还未登录");
			return "f:/jsps/login.jsp";
		}
		Appiontment appiontment = CommonUtils.toBean(request.getParameterMap(), Appiontment.class);
		appiontment.setRid(CommonUtils.uuid());
		appiontment.setDate(new Date());
		appiontment.setAuthor_uid(user.getUid());
		appiontment.setState(false);
		appiontmentService.saveAppiontment(appiontment);
		return "f:/index.jsp";
	}
	
	public String getApps(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setAttribute("appointments", appiontmentService.getAppiontments());
		return "f:/index.jsp";
	}
	
	public String yue(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		User user = getUser(request);
		String rid = request.getParameter("rid");
		appiontmentService.updateApp(rid,user);
		return this.loadMyInfo(request, response);
	}
	
	public String loadMyInfo(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		User user = getUser(request);
		if(user == null){
			request.setAttribute("msg", "您还未登录!");
			return "f:/jsps/login.jsp";
		}
		request.setAttribute("appointments",appiontmentService.getAppsByUid(user.getUid()));
		request.setAttribute("friends",appiontmentService.getAppsByRuid(user.getUid()));
		return "f:/jsps/userinfo.jsp";
	}
	
	private User getUser(HttpServletRequest request){
		return (User) request.getSession().getAttribute("session_user");
	}
}
