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
	@Autowired
	MyroomServiceInterface msi;

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
	public HashMap<String, Object> addpoint(HashMap<String, Object> param) {
		System.out.println(param);
		HashMap<String, Object> result = sdi.selectpoint(param);
		int point = Integer.parseInt(result.get("point").toString());
		int price = Integer.parseInt(param.get("price").toString());
		if( point < price ) {
			result.put("msg", "보유하신 포인트가 부족합니다.");
		}else {
			int status = sdi.uppoint2(param);
			if(status == 1) {
				status = sdi.uppoint(param);
				if(status == 1) {
					result = msi.addinven(param);
				}
			}else {
				result.put("msg", "구매과정에서 문제가 발생하였습니다.");
			}
		}
		return result;
	}
	
	
}