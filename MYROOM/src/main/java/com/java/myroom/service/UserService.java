package com.java.myroom.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.myroom.dao.MyroomDaoInterface;
import com.java.myroom.dao.UserDao;
import com.java.myroom.dao.UserDaoInterface;

@Service
public class UserService implements UserServiceInterface {
	@Autowired
	UserDaoInterface udi;
	@Autowired
	MyroomDaoInterface mdi;
	
	@Override
	public HashMap<String, Object> addUser(HashMap<String, Object> param){
		HashMap<String, Object> result = new HashMap<String, Object>();
		int status = udi.addUser(param);
		if(status == 1) {
			status = udi.addRoom(param);
			if(status != 1 ) {
				result.put("msg", "예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
			}
		}else {
			result.put("msg", "예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
		}
		return result;
	}

	@Override
	public HashMap<String, Object> selectRoom(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result = udi.selectuser(param);
		if(Integer.parseInt(result.get("user").toString()) == 0){
			addUser(param);
			result = new HashMap<String, Object>();
		}
		result.put("point", udi.selectuser(param));
		result.put("result", udi.selectRoom(param));
		result.put("inven", mdi.selectinven(param));
		return result;
	}
}
