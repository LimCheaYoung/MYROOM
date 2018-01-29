package com.java.myroom.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.myroom.dao.FriendDaoInterface;
import com.java.myroom.dao.MyroomDaoInterface;
import com.java.myroom.dao.ShopDaoInterface;
import com.java.myroom.dao.UserDao;
import com.java.myroom.dao.UserDaoInterface;
import com.java.myroom.util.HttpUtil;

@Service
public class ShopService implements ShopServiceInterface {
	@Autowired
	ShopDaoInterface sdi;

	@Override
	public HashMap<String, Object> selectshop() {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("result", sdi.selectshop());
		return result;
	}

	@Override
	public HashMap<String, Object> searchshop(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("result", sdi.searchshop(param));
		return result;
	}

	@Override
	public HashMap<String, Object> shop(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("result", sdi.selectshop());
		return result;
	}
	
	
}