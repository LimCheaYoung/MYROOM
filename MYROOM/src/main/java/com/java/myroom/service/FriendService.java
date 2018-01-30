package com.java.myroom.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.myroom.dao.FriendDaoInterface;
import com.java.myroom.dao.MyroomDaoInterface;
import com.java.myroom.dao.UserDao;
import com.java.myroom.dao.UserDaoInterface;
import com.java.myroom.util.HttpUtil;

@Service
public class FriendService implements FriendServiceInterface {
	@Autowired
	FriendDaoInterface fdi;
	@Autowired
	MyroomDaoInterface mdi;

	@Override
	public HashMap<String, Object> selectbest() {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("result", fdi.selectbest());
		return result;
	}

	@Override
	public HashMap<String, Object> findroom(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("data", fdi.findroom(param));
		result.put("inven", mdi.selectinven(param));
		return result;
	}

	@Override
	public HashMap<String, Object> selectfriend(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("result", fdi.selectfriend(param));
		return result;
	}

	@Override
	public HashMap<String, Object> myfriend(HashMap<String, Object> param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashMap<String, Object> addfriend(HashMap<String, Object> param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashMap<String, Object> delfriend(HashMap<String, Object> param) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
}