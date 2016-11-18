package cn.create.run.appiontment.dao;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import cn.create.run.appiontment.domain.Appiontment;
import cn.create.run.user.domain.User;
import cn.itcast.jdbc.TxQueryRunner;

public class AppiontmentDao {
	private QueryRunner qr = new TxQueryRunner();
	
	public void insertApp(Appiontment appiontment){
		String sql = "INSERT INTO appointment VALUES(?,?,?,?,?,?)";
		Timestamp timestamp = new Timestamp(appiontment.getDate().getTime());
		Object[] params = {appiontment.getRid(),appiontment.getAuthor_uid(),appiontment.getResponder_uid(),
						appiontment.getState(),timestamp,appiontment.getDescribe()};
		try {
			qr.update(sql,params);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public List<Appiontment> getAllApps(){
		String sql = "SELECT * FROM appointment WHERE state =0  LIMIT 0,3";
		try {
			List<Appiontment> appiontments = qr.query(sql, new BeanListHandler<Appiontment>(Appiontment.class));
			return appiontments;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public List<Appiontment> getAppsByUid(String uid){
		String sql = "SELECT * FROM appointment WHERE author_uid=?";
		try {
			List<Appiontment> appiontments = qr.query(sql, new BeanListHandler<Appiontment>(Appiontment.class),uid);
			return appiontments;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public List<Appiontment> getAppsByRuid(String uid){
		String sql = "SELECT * FROM appointment WHERE responder_uid=?";
		try {
			List<Appiontment> appiontments = qr.query(sql, new BeanListHandler<Appiontment>(Appiontment.class),uid);
			return appiontments;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	public void updateApp(String rid, User user) {
		String sql = "UPDATE appointment SET state=true,responder_uid=? WHERE rid=?";
		try {
			qr.update(sql, user.getUid(),rid);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		
	}
	
}
