package com.fastival.demo.util;

public class CustomReturn {
    private int state;
    private String message;
    private String result = null;

    public CustomReturn(int state, String message, String result) {
        this.state = state;
        this.message = message;
        if (result != null) {
            this.result = result;
        }
    }

    public int getState() {
        return state;
    }

    public String getMessage() {
        return message;
    }

    public String getResult() {
        return result;
    }
}
