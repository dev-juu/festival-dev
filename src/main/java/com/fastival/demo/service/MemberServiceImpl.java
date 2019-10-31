package com.fastival.demo.service;

import javax.inject.Inject;

import com.fastival.demo.model.dao.MemberDAO;
import com.fastival.demo.model.dto.MemberDTO;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
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
}
