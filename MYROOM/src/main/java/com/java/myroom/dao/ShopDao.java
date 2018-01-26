package com.java.myroom.dao;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class ShopDao implements ShopDaoInterface {

	@Resource(name="sqlSession")
	SqlSession session;

	@Override
	public List<HashMap<String, Object>> searchshop(HashMap<String, Object> param) {
		return session.selectList("shop.searchshop", param);
	}
	
	
	@Override
	public List<HashMap<String, Object>> selectshop() {
		return session.selectList("shop.selectshop");
	}
	
	
}