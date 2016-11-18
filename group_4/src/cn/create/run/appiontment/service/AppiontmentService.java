package cn.create.run.appiontment.service;

import java.util.List;

import cn.create.run.appiontment.dao.AppiontmentDao;
import cn.create.run.appiontment.domain.Appiontment;
import cn.create.run.user.dao.UserDao;
import cn.create.run.user.domain.User;

public class AppiontmentService {
	private AppiontmentDao appiontmentDao = new AppiontmentDao();
	private UserDao userDao = new UserDao();
	
	public void saveAppiontment(Appiontment appiontment){
		appiontmentDao.insertApp(appiontment);
	}
	
	public List<Appiontment> getAppiontments(){
		List<Appiontment> appiontments = appiontmentDao.getAllApps();
		return finish(appiontments);
	}

	public List<Appiontment> getAppsByUid(String uid){
		List<Appiontment> appiontments = appiontmentDao.getAppsByUid(uid);
		return finish(appiontments);
	}
	public List<Appiontment> getAppsByRuid(String uid){
		List<Appiontment> appiontments = appiontmentDao.getAppsByRuid(uid);
		return finish(appiontments);
	}
	
	private List<Appiontment> finish(List<Appiontment> appiontments){
		for(Appiontment appiontment : appiontments){
			String auid = appiontment.getAuthor_uid();
			appiontment.setAuthor(userDao.getUserByUid(auid));
			String ruid = appiontment.getResponder_uid();
			appiontment.setResponder(userDao.getUserByUid(ruid));
		}
		return appiontments;
	}

	public void updateApp(String rid, User user) {
		appiontmentDao.updateApp(rid,user);
	}
}
