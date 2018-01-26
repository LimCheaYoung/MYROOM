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

	@Override
	public HashMap<String, Object> selectbest() {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("result", fdi.selectbest());
		return result;
	}

	@Override
	public HashMap<String, Object> findroom(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("result", fdi.findroom(param));
		return result;
	}

	@Override
	public HashMap<String, Object> selectfriend(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("result", fdi.selectfriend(param));
		return result;
	}

	
	
}