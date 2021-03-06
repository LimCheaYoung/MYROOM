package com.java.myroom.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.java.myroom.dao.MyroomDaoInterface;
import com.java.myroom.service.MyroomServiceInterface;
import com.java.myroom.service.UserServiceInterface;
import com.java.myroom.util.HttpUtil;

@Controller
public class MyroomController {
	
	@Autowired
	MyroomServiceInterface msi;
	
	@RequestMapping(value = "/selectRoom", method = RequestMethod.POST)
	public ModelAndView selectRoom(HttpServletRequest req){
		return HttpUtil.returnJson(msi.selectRoom(HttpUtil.paramMap(req)));
	}
	@RequestMapping(value = "/uptile", method = RequestMethod.POST)
	public ModelAndView uptile(HttpServletRequest req){
		return HttpUtil.returnJson(msi.uptile(HttpUtil.paramMap(req)));
	}
	@RequestMapping(value = "/additem", method = RequestMethod.POST)
	public ModelAndView additem(HttpServletRequest req) throws Exception{
		return HttpUtil.returnJson(msi.additem(HttpUtil.paramMap(req), req));
	}
	@RequestMapping(value = "/addinven", method = RequestMethod.POST)
	public ModelAndView addinven(HttpServletRequest req){
		return HttpUtil.returnJson(msi.addinven(HttpUtil.paramMap(req)));
	}
	@RequestMapping(value = "/addshop", method = RequestMethod.POST)
	public ModelAndView addUser(HttpServletRequest req) throws Exception{
		return HttpUtil.returnJson(msi.addshop(HttpUtil.paramMap(req), req));
	}
	
	@RequestMapping(value = "/selectinven", method = RequestMethod.POST)
	public ModelAndView selectinven(HttpServletRequest req){
		return HttpUtil.returnJson(msi.selectinven(HttpUtil.paramMap(req)));
	}
}
