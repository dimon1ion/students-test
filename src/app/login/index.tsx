import { memo, useCallback, useState } from "react";
import PageLayout from "../../components/layouts/page-layout";
import { Checkbox, Form, Input } from "antd";
import CardLogin from "../../components/global/card-login";
import HeaderForm from "../../components/ui/header-form";
import ButtonForm from "../../components/ui/button-form";
import CardLayout from "../../components/layouts/card-layout";
import SideLayout from "../../components/layouts/side-layout";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTitle from "@src/hooks/use-title";

interface IFieldType {
  email: string;
  password: string;
  remember: boolean;
}

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useTitle("Вход");
  const select = useSelector(state => ({
    errorMessage: state.session.errorMessage,
  }))

  const callbacks = {
    onSignIn: useCallback(
      async (values: IFieldType) => {
        setLoading(true);
        await store.actions.session.signIn(values, () => {
          // Возврат на страницу, с которой пришли
          console.log(location.state?.back);
          console.log(location.pathname);
          const back = location.state?.back && location.state?.back !== location.pathname
            ? location.state?.back
            : '/';
          navigate(back);
        });
        setLoading(false);
      },
      [navigate]
    ),
  };

  return (
    <PageLayout>
      <CardLayout>
        <CardLogin>
          <Form layout="vertical" onFinish={callbacks.onSignIn}>
            <HeaderForm>Вход для студентов</HeaderForm>
            <Form.Item<IFieldType>
              name="email"
              label="логин"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста заполните поле логина!",
                },
              ]}
            >
              <Input size="large" placeholder="Введите логин" />
            </Form.Item>
            <Form.Item<IFieldType>
              name="password"
              label="пароль"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста заполните поле пароля!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Введите пароль" />
            </Form.Item>
            <SideLayout side={"end"}>
              <Form.Item<IFieldType> name="remember" valuePropName="checked">
                <Checkbox>Запомнить меня</Checkbox>
              </Form.Item>
            </SideLayout>
            <Form.Item validateStatus={select.errorMessage ? "error" : ""} help={select.errorMessage}>
              <ButtonForm htmlType="submit" size="large" loading={loading}>
                {loading ? "Загрузка" : "Войти"}
              </ButtonForm>
            </Form.Item>
          </Form>
        </CardLogin>
      </CardLayout>
    </PageLayout>
  );
}

export default memo(Login);
