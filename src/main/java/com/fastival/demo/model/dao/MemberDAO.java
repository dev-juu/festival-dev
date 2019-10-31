package com.fastival.demo.model.dao;

import org.apache.ibatis.annotations.Insert;
import com.fastival.demo.model.dto.MemberDTO;
import org.apache.ibatis.annotations.Select;

public interface MemberDAO {

    @Insert("insert into tb_member (mem_email, mem_passwd, mem_nickname) values (#{mem_email}, #{mem_passwd}, #{mem_nickname})")
    public void join(MemberDTO dto);

    @Select("select count(*) from tb_member where mem_email = #{mem_email} and mem_passwd = #{mem_passwd}")
    public int login(MemberDTO dto);

    @Select("select count(*) from tb_member where ${type} = #{value}")
    public int select_overlap(String type, String value);

}
