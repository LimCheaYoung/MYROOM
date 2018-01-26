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
import com.java.myroom.service.UserServiceInterface;
import com.java.myroom.util.HttpUtil;

@Controller
public class FriendController {
	
	@Autowired
	FriendServiceInterface fsi;
	
	@RequestMapping(value = "/selectbest", method = RequestMethod.POST)
	public ModelAndView selectbest(HttpServletRequest req){
		return HttpUtil.returnJson(fsi.selectbest());
	}
	@RequestMapping(value = "/findroom", method = RequestMethod.POST)
	public ModelAndView findroom(HttpServletRequest req){
		return HttpUtil.returnJson(fsi.findroom(HttpUtil.paramMap(req)));
	}
	@RequestMapping(value = "/selectfriend", method = RequestMethod.POST)
	public ModelAndView selectfriend(HttpServletRequest req){
		return HttpUtil.returnJson(fsi.selectfriend(HttpUtil.paramMap(req)));
	}
}
