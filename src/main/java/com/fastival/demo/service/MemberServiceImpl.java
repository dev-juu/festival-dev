package com.fastival.demo.service;

import javax.inject.Inject;

import com.fastival.demo.model.dao.MemberDAO;
import com.fastival.demo.model.dto.MemberDTO;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    @Inject
    MemberDAO memberDao;

    @Override
    public void join(MemberDTO dto) {
        memberDao.join(dto);
    }

    @Override
    public int login(MemberDTO dto) {
        int result = memberDao.login(dto);
        return result;
    }

    @Override
    public int select_overlap(String type, String value) {
        int count = memberDao.select_overlap(type, value);
        return count;
    }
}
