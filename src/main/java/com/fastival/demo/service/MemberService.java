package com.fastival.demo.service;

import com.fastival.demo.model.dto.MemberDTO;

public interface MemberService {

    public void join(MemberDTO dto); //회원가입

    public int login(MemberDTO dto); //로그인
}
