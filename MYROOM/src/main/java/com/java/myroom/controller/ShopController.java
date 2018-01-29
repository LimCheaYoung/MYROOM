package com.java.myroom.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.java.myroom.dao.MyroomDaoInterface;
import com.java.myroom.service.FriendServiceInterface;
import com.java.myroom.service.MyroomServiceInterface;
import com.java.myroom.service.ShopServiceInterface;
import com.java.myroom.service.UserServiceInterface;
import com.java.myroom.util.HttpUtil;

@Controller
public class ShopController {
	
	@Autowired
	ShopServiceInterface ssi;
	
	@RequestMapping(value = "/selectshop", method = RequestMethod.POST)
	public ModelAndView selectshop(HttpServletRequest req){
		return HttpUtil.returnJson(ssi.selectshop());
	}
	@RequestMapping(value = "/searchshop", method = RequestMethod.POST)
	public ModelAndView searchshop(HttpServletRequest req){
		return HttpUtil.returnJson(ssi.searchshop(HttpUtil.paramMap(req)));
	}
	@RequestMapping(value = "/addpoint", method = RequestMethod.POST)
	public ModelAndView addpoint(HttpServletRequest req){
		return HttpUtil.returnJson(ssi.addpoint(HttpUtil.paramMap(req)));
	}

}
