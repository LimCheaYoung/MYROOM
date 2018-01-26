package com.java.myroom.dao;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class MyroomDao implements MyroomDaoInterface {

	@Resource(name="sqlSession")
	SqlSession session;

	@Override
	public int uptile(HashMap<String, Object> param) {
		return session.update("myroom.uptile", param);
	}

	@Override
	public int upobject(HashMap<String, Object> param) {
		return session.update("myroom.upobject", param);
	}

	@Override
	public int additem(HashMap<String, Object> param) {
		return session.insert("myroom.additem", param);
	}

	@Override
	public int addinven(HashMap<String, Object> param) {
		return session.insert("myroom.addinven", param);
	}

	@Override
	public int addshop(HashMap<String, Object> param) {
		return session.insert("myroom.addshop", param);
	}

	@Override
	public HashMap<String, Object> selectitem(HashMap<String, Object> param) {
		return session.selectOne("myroom.selectitem", param);
	}
	
	@Override
	public List<HashMap<String, Object>> selectinven(HashMap<String, Object> param) {
		return session.selectList("myroom.selectinven", param);
	}
	
	
}