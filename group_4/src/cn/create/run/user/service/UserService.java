package cn.create.run.user.service;

import java.util.List;

import cn.create.run.user.dao.UserDao;
import cn.create.run.user.domain.User;

public class UserService {
	private UserDao userDao = new UserDao();
	
	public void register(User user) throws UserException{
		User _user = userDao.findUser(user);
		if(_user != null){
			throw new UserException("学号已被注册");
		}
		userDao.insertUser(user);
	}
	
	public User findUser(User user){
		return userDao.findUser(user);
	}
	
	public List<User> getBestUsers(){
		return userDao.getBestUser();
	}
	
	public User getUserByUid(String uid){
		return userDao.getUserByUid(uid);
	}
	
	public void modify(User user){
		userDao.modify(user);
	}
}
