package cn.create.run.user.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import cn.create.run.user.domain.User;
import cn.itcast.jdbc.TxQueryRunner;

public class UserDao {
	private QueryRunner qr = new TxQueryRunner();
	
	public User findUser(User user){
		User _user = null;
		String sql = "SELECT * FROM tb_user WHERE cid=?";
		try {
			_user = qr.query(sql, new BeanHandler<User>(User.class),user.getCid());
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		return _user;
	}
	
	public void insertUser(User user){
		try {
			String sql = "INSERT INTO tb_user VALUES(?,?,?,?,?,?,?,?,?)";
			Object[] params = {user.getUid(),user.getCid(),user.getUname(),
								user.getSuccess(),user.getTel(),user.getWeixin(),
								user.getQianmin(),user.getUclass(),user.getPassword()};
			qr.update(sql, params);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public User getUserByUid(String uid){
		String sql = "SELECT * FROM tb_user WHERE uid=?";
		try {
			return qr.query(sql, new BeanHandler<User>(User.class),uid);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public List<User> getBestUser(){
		String sql = "SELECT * FROM tb_user ORDER BY success DESC LIMIT 0,5";
		try {
			return qr.query(sql, new BeanListHandler<User>(User.class));
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	public void modify(User user) {
		try {
			String sql = "UPDATE tb_user SET uclass=?,uname=?,qianmin=?,weixin=?,tel=? WHERE uid=?";
			Object[] params = {user.getUclass(),user.getUname(),user.getQianmin(),
								user.getWeixin(), user.getTel(),user.getUid()};
			qr.update(sql, params);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
}
