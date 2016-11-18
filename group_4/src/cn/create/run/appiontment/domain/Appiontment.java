package cn.create.run.appiontment.domain;

import java.util.Date;

import cn.create.run.user.domain.User;

public class Appiontment {
	private String rid;
	private String author_uid;
	private User author;
	private String responder_uid;
	private User responder;
	private Boolean state;
	private Date date;
	private String describe;
	public String getRid() {
		return rid;
	}
	public void setRid(String rid) {
		this.rid = rid;
	}
	public Boolean getState() {
		return state;
	}
	public void setState(Boolean state) {
		this.state = state;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	public String getAuthor_uid() {
		return author_uid;
	}
	public void setAuthor_uid(String author_uid) {
		this.author_uid = author_uid;
	}
	public String getResponder_uid() {
		return responder_uid;
	}
	public void setResponder_uid(String responder_uid) {
		this.responder_uid = responder_uid;
	}
	public User getAuthor() {
		return author;
	}
	public void setAuthor(User author) {
		this.author = author;
	}
	public User getResponder() {
		return responder;
	}
	public void setResponder(User responder) {
		this.responder = responder;
	}
	@Override
	public String toString() {
		return "Appiontment [rid=" + rid + ", author_uid=" + author_uid
				+ ", author=" + author + ", responder_uid=" + responder_uid
				+ ", responder=" + responder + ", state=" + state + ", date="
				+ date + ", describe=" + describe + "]";
	}
		
}
