package com.java.myroom.dao;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class FriendDao implements FriendDaoInterface {

	@Resource(name="sqlSession")
	SqlSession session;

	@Override
	public List<HashMap<String, Object>> selectfriend(HashMap<String, Object> param) {
		return session.selectList("friend.selectfriend", param);
	}
	
	@Override
	public HashMap<String, Object> findroom(HashMap<String, Object> param) {
		return session.selectOne("friend.findroom", param);
	}
	
	
	@Override
	public List<HashMap<String, Object>> selectbest() {
		return session.selectList("friend.selectbest");
	}
	
	
}