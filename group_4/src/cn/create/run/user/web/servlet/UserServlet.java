package cn.create.run.user.web.servlet;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import cn.create.run.appiontment.service.AppiontmentService;
import cn.create.run.user.domain.User;
import cn.create.run.user.service.UserException;
import cn.create.run.user.service.UserService;
import cn.itcast.commons.CommonUtils;
import cn.itcast.servlet.BaseServlet;

public class UserServlet extends BaseServlet {
	private UserService userService = new UserService();
	
	public String login(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		User user = CommonUtils.toBean(request.getParameterMap(), User.class);
		User _user = userService.findUser(user);
		if(_user == null){
			request.setAttribute("msg", "账户不存在！");
			return "f:/jsps/login.jsp";
		}else if(!user.getPassword().equals(_user.getPassword())){
			request.setAttribute("msg", "密码错误！");
			return "f:/jsps/login.jsp";
		}else{
			request.getSession().setAttribute("session_user", _user);
			return "f:/index.jsp";
		}
	}
	
	public String loadUsers(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setAttribute("users", userService.getBestUsers());
		return "f:/jsps/rank.jsp";
	}
	
	public String showUser(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setAttribute("userinfo", userService.getUserByUid(request.getParameter("uid")));
		String rid = request.getParameter("rid");
		if(rid != null){
			request.setAttribute("rid", rid);
		}
		return "f:/jsps/usershow.jsp";
	}

	
	public String register(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		User form = CommonUtils.toBean(request.getParameterMap(), User.class);
		if(form.getCid()==null || form.getCid().isEmpty()){
			request.setAttribute("msg", "学号不能为空");
			return "f:/jsps/register.jsp";
		}
		if(form.getPassword()==null || form.getPassword().isEmpty()){
			request.setAttribute("msg", "密码不能为空");
			return "f:/jsps/register.jsp";
		}
		if(form.getUname()==null || form.getUname().isEmpty()){
			request.setAttribute("msg", "姓名不能为空");
			return "f:/jsps/register.jsp";
		}
		if(form.getUclass()==null || form.getUclass().isEmpty()){
			request.setAttribute("msg", "班级不能为空");
			return "f:/jsps/register.jsp";
		}
		if(form.getTel()==null || form.getTel().isEmpty()){
			request.setAttribute("msg", "手机号不能为空");
			return "f:/jsps/register.jsp";
		}
		if(form.getWeixin()==null || form.getWeixin().isEmpty()){
			request.setAttribute("msg", "微信号不能为空");
			return "f:/jsps/register.jsp";
		}
		form.setUid(CommonUtils.uuid());
		form.setSuccess(0);
		try {
			userService.register(form);
			return "f:/index.jsp";
		} catch (UserException e) {
			request.setAttribute("msg", e.getMessage());
			return "f:/jsps/register.jsp";
		}
	}
	
	public String quit(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		session.removeAttribute("session_user");
		return "r:/jsps/login.jsp";
	}
	
	public String modify(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		User form = (User) CommonUtils.toBean(request.getParameterMap(), User.class);
		userService.modify(form);
		User newUser = userService.getUserByUid(form.getUid());
		HttpSession session = request.getSession();
		session.removeAttribute("session_user");
		session.setAttribute("session_user", newUser);
		return "r:/AppiontmentServlet?method=loadMyInfo";
	}
	
}
