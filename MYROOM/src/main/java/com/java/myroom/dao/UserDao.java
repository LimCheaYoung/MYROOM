package com.java.myroom.dao;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao implements UserDaoInterface {

	@Resource(name="sqlSession")
	SqlSession session;

	@Override
	public int addUser(HashMap<String, Object> param) {
		return session.insert("user.addUser", param);
	}
	@Override
	public HashMap<String, Object> selectuser(HashMap<String, Object> param){
		return session.selectOne("user.selectUser", param);
	}
	@Override
	public int addRoom(HashMap<String, Object> param) {
		return session.insert("user.addRoom", param);
	}


}
