# test_virtualtown

プロジェクトの構成
main.py:
ユーザーから偉人の名前と議論のテーマを入力として受け取ります。
偉人のプロフィールを生成し、エージェントを作成します。
エージェント同士の対話を生成し、出力します。

agent.py:
Agent クラスを定義し、エージェントの属性と対話のメソッドを持ちます。

environment.py:
Environment クラスを定義し、エージェントが観察する世界の状態を管理します。

dialog.py:

DialogueSystem クラスを定義し、OpenAIのAPIを使用して対話を生成します。
agent_profile.py:

偉人のプロフィールを生成する関数を定義します。
requirements.txt:

プロジェクトで使用するPythonパッケージのリストを管理します。
