package com.java.myroom.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.myroom.dao.MyroomDaoInterface;
import com.java.myroom.dao.UserDao;
import com.java.myroom.dao.UserDaoInterface;
import com.java.myroom.util.HttpUtil;

@Service
public class MyroomService implements MyroomServiceInterface {
	@Autowired
	MyroomDaoInterface mdi;
	@Autowired
	FileServiceInterface fsi;

	@Override
	public HashMap<String, Object> uptile(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		int status = mdi.uptile(param);
		if(status == 1) {
			status = mdi.upobject(param);
			if(status == 1) {
				result.put("msg", "저장되었습니다.");
			}else {
				result.put("msg", "저장과정에서 문제가 발생하였습니다.");
			}
		}else {
			result.put("msg", "저장과정에서 문제가 발생하였습니다.");
		}
		return result;
	}

	
	@Override
	public HashMap<String, Object> addinven(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		int status = mdi.addinven(param);
		if(status == 1) {
			result.put("msg", "정상적으로 구매하였습니다.");
		}else {
			result.put("msg", "구매과정에서 문제가 발생하였습니다.");
		}
		return result;
	}

	@Override
	public HashMap<String, Object> additem(HashMap<String, Object> param) throws Exception{
		HashMap<String, Object> result = new HashMap<String, Object>();
		result = mdi.selectitem(param);
		
		if(Integer.parseInt(result.get("count").toString()) != 0) {
			result.put("msg", "이미 이름입니다.");
		}else {
			int status = mdi.additem(param);
			result = mdi.selectitem(param);
			if(status == 1) {
				param.put("itemno", result.get("itemno"));	
				status = mdi.addinven(param);
				if(status != 1) {
					result.put("msg", "예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
				}else {
					fsi.Fileupload(param.get("data").toString(), param.get("itemno").toString());
					return param;
				}
			} else {
				result.put("msg", "예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
			}
		}

		return result;
	}


	@Override
	public HashMap<String, Object> addshop(HashMap<String, Object> param) throws Exception {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result = additem(param);
		if(result.containsKey("msg")) {
			return result;
		}
		
		param.put("itemno", result.get("itemno"));
		if(HttpUtil.isInteger(param.get("price").toString())) {
			int status = mdi.addshop(param);
			if(status != 1) {
				result.put("msg", "예기치 못한 오류가 발생하였습니다. 다시 시도해주세요.");
				return result;
			}
			result.put("status", status);
		}else {
			result.put("msg", "숫자만 입력해주세요.");
		}
		
		return result;
	}

	@Override
	public HashMap<String, Object> selectinven(HashMap<String, Object> param) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("inven", mdi.selectinven(param));
		return result;
	}

	
	
}