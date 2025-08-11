#include <napi.h>
#include <windows.h>
#include <shellscalingapi.h>
#pragma comment(lib, "Shcore.lib")

Napi::String Method(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    return Napi::String::New(env, "world");
}

Napi::Object GetWindowPos(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    HWND hwnd = GetForegroundWindow();
    if (hwnd == nullptr)
    {
        Napi::TypeError::New(env, "No foreground window found").ThrowAsJavaScriptException();
        return env.Null().As<Napi::Object>();
    }

    RECT rect;
    if (GetWindowRect(hwnd, &rect))
    {
        Napi::Object pos = Napi::Object::New(env);
        pos.Set("x", Napi::Number::New(env, rect.left));
        pos.Set("y", Napi::Number::New(env, rect.top));
        return pos;
    }
    else
    {
        Napi::Error::New(env, "Failed to get window position").ThrowAsJavaScriptException();
        return env.Null().As<Napi::Object>();
    }
}

Napi::Value MySetWindowPos(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    if (info.Length() < 3 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber()) //
    {
        Napi::TypeError::New(env, "Expected three numbers as arguments").ThrowAsJavaScriptException();
        return env.Null();
    }
    HWND hwnd = HWND(info[0].As<Napi::Number>().Uint32Value());
    int x = info[1].As<Napi::Number>().Int32Value();
    int y = info[2].As<Napi::Number>().Int32Value();
    // HWND hwnd = GetForegroundWindow();
    if (hwnd == nullptr)
    {
        Napi::TypeError::New(env, "No foreground window found").ThrowAsJavaScriptException();
        return env.Null();
    }
    if (SetWindowPos(hwnd, nullptr, x, y, 0, 0, SWP_NOSIZE | SWP_NOZORDER))
    {
        return Napi::Boolean::New(env, true);
    }
    Napi::Error::New(env, "Failed to set window position").ThrowAsJavaScriptException();
    return Napi::Boolean::New(env, false);
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, Method));
    exports.Set(Napi::String::New(env, "getWindowPos"), Napi::Function::New(env, GetWindowPos));
    exports.Set(Napi::String::New(env, "setWindowPos"), Napi::Function::New(env, MySetWindowPos));

    return exports;
}

NODE_API_MODULE(addon, Init)